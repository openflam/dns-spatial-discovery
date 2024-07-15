import { CONFIG } from './config.js';
import { DNS } from './dns.js';
import { LocationToGeoDomain } from './location-to-geo-domain.js';

class LocationToServerAddr {
    // The DNS object to use for querying DNS records
    dnsObj = null;

    constructor() {
        this.dnsObj = new DNS();
    }

    /**
     * 
     * @param {Number} lat Latitude
     * @param {Number} lon Longitude
     * @param {Number} error_m Error in meters
     * @param {String} suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Domains to query for the given location.
     */
    async getServersAddrs(lat, lon, error_m, suffix = CONFIG.GEO_DOMAIN_SUFFIX) {
        var geoDomains = LocationToGeoDomain.getGeoDomains(lat, lon, error_m, suffix);
        var serverAddrs = [];
        for (let domain of geoDomains) {
            try {
                const result = await this.dnsObj.dnsLookup(domain, 'TXT');
                for (let record of result) {
                    if ('data' in record) {
                        serverAddrs.push(record.data);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return serverAddrs;
    }
}

export { LocationToServerAddr };