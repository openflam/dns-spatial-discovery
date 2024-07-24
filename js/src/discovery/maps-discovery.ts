import { DNS } from './dns';
import { LocationToGeoDomain } from './location-to-geo-domain';
import { MapServer } from '../localization/map-server';
import { DNSRecord } from './dns';
import { CONFIG } from '../config';


// Nameserver and the DNS object to use for querying DNS records from this name server
// This is to prevent caches from different name servers from mixing up
class Nameserver {
    name: string;
    dnsObj: DNS;

    constructor(name: string) {
        this.name = name;
        this.dnsObj = new DNS();
    }

    async lookup(domain: string, type: string): Promise<DNSRecord[]> {
        return this.dnsObj.dnsLookup(domain, type, this.name);
    }
}

// Queue of name servers
class NameserverQueue {
    // Queue
    queue: Nameserver[];

    constructor() {
        this.queue = [];
    }

    // Add a record to the queue
    add(nameserver: Nameserver): void {
        this.queue.push(nameserver);
    }

    // Get a record from the queue
    get(): Nameserver | null {
        if (this.queue.length === 0) {
            return null;
        }
        return this.queue.shift();
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}

class MapsDiscovery {
    // Root name server
    rootNameserver: string = CONFIG.DoH_URL;

    // Queue for name servers to maintain discovered name servers
    nameserverQueue: NameserverQueue = new NameserverQueue();

    // Name-based filter to apply to the list of servers
    // Default is to accept all names
    nameFilter: (name: string) => boolean = (name: string) => true;

    // Currently discovered map servers dictionary with the domain name as the key
    mapServers: { [key: string]: MapServer } = {};

    constructor(rootNameserver: string = CONFIG.DoH_URL) {
        this.rootNameserver = rootNameserver;
        // Add the root name server to the queue
        let rootNameserverObj = new Nameserver(this.rootNameserver);
        this.nameserverQueue.add(rootNameserverObj);
    }

    /**
     * 
     * @param lat Latitude
     * @param lon Longitude
     * @param error_m Error in meters
     * @param suffix The suffix to append to the geo domains.
     * @returns Domains to query for the given location.
     */
    async discoverMapServers(
        lat: number, lon: number,
        error_m: number,
        suffix: string
    ): Promise<{ [name: string]: MapServer }> {
        while (!this.nameserverQueue.isEmpty()) {
            let nameserver = this.nameserverQueue.get();
            if (nameserver === null) {
                break;
            }
            await this.discoverMapsInNameserver(lat, lon, error_m, suffix, nameserver);
        }
        return this.mapServers;
    }

    async discoverMapsInNameserver(
        lat: number, lon: number,
        error_m: number,
        suffix: string,
        nameserver: Nameserver
    ): Promise<{ [name: string]: MapServer }> {
        const geoDomains = LocationToGeoDomain.getGeoDomains(lat, lon, error_m, suffix);
        for (const domain of geoDomains) {
            let dnsLookupResults = null;
            try {
                dnsLookupResults = await nameserver.lookup(domain, 'TXT');
            }
            catch (error) {
                console.log(error);
                continue;
            }
            for (const record of dnsLookupResults) {
                this.updateMapServersFromDNSRecord(record);
            }
        }
        return this.mapServers;
    }

    updateMapServersFromDNSRecord(record: DNSRecord) {
        if (!('data' in record)) {
            return;
        }
        // Parse the data field as JSON
        let recordData = record.data;
        const jsonString = recordData
            .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Add double quotes around keys
            .replace(/:([a-zA-Z0-9_.]+)/g, ':"$1"') // Add double quotes around values
        const recordDataJSON = JSON.parse(jsonString);

        // Update map servers list if the record is of type MCNAME
        if (recordDataJSON.type === 'MCNAME') {
            let name = recordDataJSON.data;
            if (this.nameFilter(name)) {
                let mapServer = new MapServer(name);
                this.mapServers[name] = mapServer;
            }
        }

        // Update the name server queue if the record is of type MNS
        if (recordDataJSON.type === 'MNS') {
            let name = recordDataJSON.data;
            if (name.endsWith('.')) {
                name = name.slice(0, -1);
            }
            let nameserver = new Nameserver(`https://${name}`);
            this.nameserverQueue.add(nameserver);
        }
    }
}

export { MapsDiscovery };
