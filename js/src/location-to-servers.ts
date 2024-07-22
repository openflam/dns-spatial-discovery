import { CONFIG } from './config';
import { DNS } from './dns';
import { LocationToGeoDomain } from './location-to-geo-domain';

class LocationToServerAddr {
    // The DNS object to use for querying DNS records
    dnsObj: DNS;

    constructor() {
        this.dnsObj = new DNS();
    }

    /**
     * 
     * @param lat Latitude
     * @param lon Longitude
     * @param error_m Error in meters
     * @param suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Domains to query for the given location.
     */
    async getServersAddrs(lat: number, lon: number, error_m: number, suffix: string = CONFIG.GEO_DOMAIN_SUFFIX): Promise<string[]> {
        const geoDomains = LocationToGeoDomain.getGeoDomains(lat, lon, error_m, suffix);
        const serverAddrs: string[] = [];
        for (const domain of geoDomains) {
            try {
                const result = await this.dnsObj.dnsLookup(domain, 'TXT');
                for (const record of result) {
                    if ('data' in record) {
                        serverAddrs.push(record.data);
                    }
                }
            } catch (error) {
                console.log(error);
                continue;
            }
        }
        return serverAddrs;
    }
}

export { LocationToServerAddr };
