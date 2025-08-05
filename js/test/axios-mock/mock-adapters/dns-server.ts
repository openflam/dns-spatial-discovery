import zonefile from 'dns-zonefile';
import MockAdapter from "axios-mock-adapter";
import { DNSZone } from 'dns-zonefile';

import { CMU_NS_ZONEFILE } from './zonefiles/loc-server';
import { CIC_CNAMES_ZONEFILE } from './zonefiles/cmu-ns-server';
import { INDIA_NS_ZONEFILE } from './zonefiles/india-ns-server';

const zoneFiles = [CMU_NS_ZONEFILE, CIC_CNAMES_ZONEFILE, INDIA_NS_ZONEFILE];

interface DNSResponseRecord {
    name: string;
    type: number;
    TTL: number;
    data: string;
};

interface DNSResponse {
    Answer?: DNSResponseRecord[];
    Authority?: DNSResponseRecord[];
};

function parseZoneFiles(): DNSZone[] {
    var zoneJSONs: DNSZone[] = [];
    zoneFiles.forEach((zoneFile) => {
        let zoneFileJSON = zonefile.parse(zoneFile);
        zoneJSONs.push(zoneFileJSON);
    });
    return zoneJSONs;
}

function handleRequest(requestName: string, requestType: string, zoneJSON: DNSZone): DNSResponse | null {
    let origin = zoneJSON.$origin;
    let TTL = zoneJSON.$ttl;

    let response: DNSResponse | null = null;
    let matched = false;

    // Check if a match is found against a TXT record
    if (requestType !== 'TXT') {
        return null;
    }

    let answers: DNSResponseRecord[] = [];

    zoneJSON.txt.forEach((txtRecord) => {
        let fullRecordName = txtRecord.name + '.' + origin;
        if (requestName === fullRecordName) {
            answers.push({
                name: fullRecordName,
                type: 16, // TXT record
                TTL: TTL,
                data: txtRecord.txt
            });
        }
    });

    if (answers.length > 0) {
        response = {
            Answer: answers
        };
        matched = true;
    }

    // If not, and the request lies within the zone, return the SOA record
    if (!matched && requestName.endsWith('.' + origin)) {
        response = {
            Authority: [
                {
                    name: zoneJSON.soa.mname,
                    type: 6, // SOA record
                    TTL: TTL,
                    data: `${zoneJSON.soa.mname} ${zoneJSON.soa.rname} ${zoneJSON.soa.serial} ${zoneJSON.soa.refresh} ${zoneJSON.soa.retry} ${zoneJSON.soa.expire} ${zoneJSON.soa.minimum}`
                }
            ]
        };
    }

    return response;
}

function mockDNSZones(mockAdapter: MockAdapter) {
    const zoneJSONs = parseZoneFiles();
    zoneJSONs.forEach((zoneJSON: DNSZone) => {
        let requestURL = zoneJSON.soa.mname;
        if (requestURL.endsWith('.')) {
            requestURL = requestURL.slice(0, -1);
        }
        requestURL = 'https://' + requestURL;

        mockAdapter.onGet(requestURL).reply(async (config) => {
            let requestName = config.params.name;
            let requestType = config.params.type;
            let response = handleRequest(requestName, requestType, zoneJSON);
            if (response === null) {
                return [404, 'No matching record found'];
            }
            return [200, response];
        });
    });
}

function mockExamples(mockAdapter: MockAdapter) {
    mockAdapter.onGet(
        'https://dns.google/resolve',
        {
            params: { name: 'example.com', type: 'A' },
            headers: { accept: 'application/dns-json' }
        })
        .reply(200,
            { Answer: [{ name: 'example.com', type: 1, TTL: 3600, data: '93.184.215.14' }] }
        );
}

function mockDNSServer(mockAdapter: MockAdapter) {
    mockDNSZones(mockAdapter);
    mockExamples(mockAdapter);
}

export { mockDNSServer };