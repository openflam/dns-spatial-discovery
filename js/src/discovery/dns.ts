import axios from "../axiosInstance";
import { CONFIG } from "../config";

// DNS record object stored in the cache and returned by the DNS lookup function.
interface DNSRecord {
    data?: string;
    TTL: number;
    timestamp?: number;
    error?: string;
    fromCache?: boolean;
};

// DNS response record object returned by the DoH request.
interface DNSResponseRecord {
    name: string;
    type: number;
    TTL: number;
    data: string;
};

// DNS response object returned by the DoH request.
interface DNSResponse {
    Answer?: DNSResponseRecord[];
    Authority?: DNSResponseRecord[];
};

class DNS {
    // Cache to store the IP and CNAME of domains.
    // The key is a combination of the domain and the type of record.
    // For example, to access CNAME record for example.com, use cache['example.com']['CNAME'].
    cache: { [domain: string]: { [type: string]: DNSRecord[] } } = {};

    // Mapping from DNS type ID (returned by DoH request) to type name
    // Only a few types are supported.
    // From: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4
    static DNS_TYPE_ID_TO_NAME: { [id: number]: string } = {
        1: 'A',
        5: 'CNAME',
        12: 'PTR',
        16: 'TXT',
        29: 'LOC'
    };

    dohUrl: string;
    negativeCachingEnabled: boolean;

    constructor(dohUrl: string = CONFIG.DoH_URL, negativeCachingEnabled: boolean = CONFIG.NEGATIVE_CACHING_ENABLED) {
        this.dohUrl = dohUrl;
        this.negativeCachingEnabled = negativeCachingEnabled;
    }

    /**
     * Add a record to the cache along with the timestamp.
     */
    addRecordToCache(domain: string, type: string, record: DNSRecord): void {
        if (!(domain in this.cache)) {
            this.cache[domain] = {};
        }
        if (!(type in this.cache[domain])) {
            this.cache[domain][type] = [];
        }
        record.timestamp = Date.now();
        this.cache[domain][type].push(record);
    }

    /**
     * Get record from cache if available and if TTL has not expired.
     * 
     */
    getRecordFromCache(domain: string, type: string): DNSRecord[] | null {
        if (!(domain in this.cache) || !(type in this.cache[domain])) {
            return null;
        }

        let cached_records = this.cache[domain][type];

        let recordsToReturn: DNSRecord[] = [];
        let recordIndicesToRemove: number[] = [];
        for (let i = 0; i < cached_records.length; i++) {
            let record = cached_records[i];
            if ((Date.now() - record.timestamp!) < record.TTL * 1000) {
                recordsToReturn.push(record);
            }
            // Mark record to be removed if TTL has expired
            else {
                recordIndicesToRemove.push(i);
            }
        }
        // Remove records with expired TTL
        cached_records = cached_records.filter((record, index) => !recordIndicesToRemove.includes(index));
        this.cache[domain][type] = cached_records;

        // Return the records if there are any
        if (recordsToReturn.length > 0) {
            return recordsToReturn;
        }
        return null;
    }

    /**
     * Get the requested DNS record of domain and given type. Try to use cache first.
     * If there are multiple records of the requested type, the first one is returned.
     * Add returned records to the cache even if they are not of the requested type.
     * 
     * @param {string} domain - The domain name to lookup.
     * @param {string} type - The type of record to lookup (A, CNAME, PTR, TXT, LOC).
     * @returns {Promise} - A promise that resolves to an array of records or an error message
     * 
     * The record objects contains the following relevant fields if the record is found:
     * - data: The IP address(for A type) or CNAME (for CNAME type) etc.
     * - TTL: Time to live in seconds
     * 
     * If the record is not found, the following fields are present:
     * - error: 'NO-ANSWER'
     * 
     * If the record was from the cache, the following fields are also present:
     * - timestamp: The time when the record was fetched if it is in the cache
     * - fromCache: true if the record was fetched from the cache
     */
    async dnsLookup(domain: string, type: string): Promise<DNSRecord[]> {
        if (!Object.values(DNS.DNS_TYPE_ID_TO_NAME).includes(type)) {
            throw new Error(`Unsupported DNS record type: ${type}. Supported types: ${Object.values(DNS.DNS_TYPE_ID_TO_NAME).join(', ')}`);
        }
        const cached_records = this.getRecordFromCache(domain, type);
        if (cached_records) {
            for (let record of cached_records) {
                record.fromCache = true;
            }
            return cached_records;
        }
        try {
            const response = await axios.get(this.dohUrl,
                {
                    params: { name: domain, type: type },
                    headers: { accept: 'application/dns-json' }
                });
            const data: DNSResponse = response.data;

            // Check if the response contains the requested record type and return the first one
            // If no record of the requested type is found, throw an error
            if ('Answer' in data && data.Answer.length > 0) {
                let recordsToReturn: DNSRecord[] = [];
                for (let record of data.Answer) {
                    // Add to cache
                    if (record.type in DNS.DNS_TYPE_ID_TO_NAME) {
                        this.addRecordToCache(domain, DNS.DNS_TYPE_ID_TO_NAME[record.type], record);
                    }
                    if (DNS.DNS_TYPE_ID_TO_NAME[record.type] === type) {
                        recordsToReturn.push(record);
                    }
                }
                if (recordsToReturn.length > 0) {
                    return recordsToReturn;
                }
            }
            // If no answer is found, cache the negative result if negative caching is enabled
            if ('Authority' in data && data.Authority.length > 0 && this.negativeCachingEnabled) {
                let soa_record: DNSRecord | null = null;
                for (let record of data.Authority) {
                    if (record.type === 6) {
                        soa_record = record;
                        break;
                    }
                }
                if (soa_record) {
                    const soa_record_data = soa_record.data!.split(' ');
                    // Negative caching TTL is minimum of the MINIMUM field in SOA record
                    // and the TTL of the SOA record itself. RFC 2308.
                    const minimum_soa_ttl = Number(soa_record_data[soa_record_data.length - 1]);
                    const soa_ttl = Number(soa_record.TTL);
                    const negative_caching_ttl = Math.min(minimum_soa_ttl, soa_ttl);
                    let negativeRecord: DNSRecord = {
                        error: 'NO-ANSWER',
                        TTL: negative_caching_ttl
                    }
                    this.addRecordToCache(domain, type, negativeRecord);
                    return [negativeRecord];
                }
            } else if (this.negativeCachingEnabled) {
                let errorRecord: DNSRecord = {
                    error: 'NO-AUTHORITY',
                    TTL: CONFIG.DEFAULT_NEGATIVE_CACHING_TTL
                }
                this.addRecordToCache(domain, type, errorRecord);
                return [errorRecord];
            }
        } catch (error) {
            let errorRecord: DNSRecord = {
                error: 'UNKNOWN-ERROR-OCCURED',
                TTL: CONFIG.DEFAULT_NEGATIVE_CACHING_TTL
            }
            if (this.negativeCachingEnabled) {
                this.addRecordToCache(domain, type, errorRecord);
            }
            return [errorRecord];
        }
    }
}

export { DNS, DNSRecord };
