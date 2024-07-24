import { CONFIG } from '../config';
import { DNS } from './dns';
import { LocationToGeoDomain } from './location-to-geo-domain';
import { MapServer } from '../localization/map-server';

class MapsDiscovery {
    // The DNS object to use for querying DNS records
    dnsObj: DNS;

    // Name-based filter to apply to the list of servers
    nameFilter: (name: string) => boolean;

    // Currently discovered map servers dictionary with the domain name as the key
    mapServers: { [key: string]: MapServer } = {};

    constructor(nameFilter: (name: string) => boolean | null = null) {
        this.dnsObj = new DNS();
        // No name-based filter by default
        this.nameFilter = nameFilter || ((name: string) => true);
    }

    /**
     * 
     * @param lat Latitude
     * @param lon Longitude
     * @param error_m Error in meters
     * @param suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Domains to query for the given location.
     */
    async discoverMapServers(
        lat: number, lon: number,
        error_m: number,
        suffix: string,
        nameFilter: (name: string) => boolean | null = this.nameFilter
    ): Promise<{ [name: string]: MapServer }> {
        const geoDomains = LocationToGeoDomain.getGeoDomains(lat, lon, error_m, suffix);
        for (const domain of geoDomains) {
            try {
                const result = await this.dnsObj.dnsLookup(domain, 'TXT');
                for (const record of result) {
                    if ('data' in record) {
                        let recordData = record.data;
                        const jsonString = recordData
                            .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Add double quotes around keys
                            .replace(/:([a-zA-Z0-9_.]+)/g, ':"$1"') // Add double quotes around values
                        const recordDataJSON = JSON.parse(jsonString);
                        if (recordDataJSON.type === 'MCNAME') {
                            let name = recordDataJSON.data;
                            if (nameFilter(name)) {
                                let mapServer = new MapServer(name);
                                this.mapServers[name] = mapServer;
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                continue;
            }
        }
        return this.mapServers;
    }
}

export { MapsDiscovery };
