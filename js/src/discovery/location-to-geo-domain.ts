import { s2CircleCoverer } from "../circle-coverer/circle-coverer";
import { tokenToDomainDigits } from "../utils/s2-conversions";

class LocationToGeoDomain {
    static async getBaseGeoDomains(lat: number, lon: number, error_m: number): Promise<string[][]> {
        const baseGeoDomains: string[][] = [];
        const s2Tokens = await s2CircleCoverer(lat, lon, error_m);
        for (let s2Token of s2Tokens) {
            let domainDigits = await tokenToDomainDigits(s2Token);
            baseGeoDomains.push(domainDigits);
        }
        return baseGeoDomains;
    }

    static formAddressFromDigits(digits: string[], suffix: string): string {
        return digits.join('.') + '.' + suffix;
    }

    static getParents(domainDigits: string[]): string[][] {
        const parents: string[][] = [];
        for (let i = 1; i < domainDigits.length; i++) {
            parents.push(domainDigits.slice(i));
        }
        return parents;
    }

    /**
     * 
     * @param {Number} lat Latitude
     * @param {Number} lon Longitude
     * @param {Number} error_m Error in meters
     * @param {String} suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Geo domains for the given location. Includes the base geo domain, siblings and all parent geo domains.
     */
    static async getGeoDomains(lat: number, lon: number, error_m: number,
        suffix: string): Promise<string[]> {
        const geoDomains: string[] = [];
        const baseGeoDomains = await LocationToGeoDomain.getBaseGeoDomains(lat, lon, error_m);
        for (let baseGeoDomain of baseGeoDomains) {
            geoDomains.push(LocationToGeoDomain.formAddressFromDigits(baseGeoDomain, suffix));
            for (let parent of LocationToGeoDomain.getParents(baseGeoDomain)) {
                geoDomains.push(LocationToGeoDomain.formAddressFromDigits(parent, suffix));
            }
        }
        // Get unique geo domains
        return Array.from(new Set(geoDomains));
    }
}

export { LocationToGeoDomain };
