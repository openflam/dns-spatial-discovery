import { s2CircleCoverer } from "../circle-coverer/circle-coverer";
import { tokenToDomainDigits } from "../utils/s2-conversions";
import { CONFIG } from "../config";

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

    static formAddressFromDigits(digits: string[], altitude: string, suffix: string): string {
        return altitude + '.' + digits.join('.') + '.' + suffix;
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
     * @param {Number} altitude Altitude in feet. If it unknown, pass 'U'.
     * @param {Boolean} exploreUnknownAltitude If true, explore unknown altitude. If false, explore only the given altitude.
     * @returns Geo domains for the given location. Includes the base geo domain, siblings and all parent geo domains.
    */
    static async getGeoDomains(lat: number, lon: number, error_m: number, suffix: string,
        altitude: number | string = CONFIG.UNKOWN_ALTITUDE_CODE, exploreUnknownAltitude: boolean = false): Promise<string[]> {
        // Convert altitude to string
        let altitudeString: string = '';
        if (typeof altitude === 'string') {
            altitudeString = altitude;
        } else if (typeof altitude === 'number') {
            altitudeString = Math.round(Number(altitude)).toString();
        }

        const geoDomains: string[] = [];
        const baseGeoDomains = await LocationToGeoDomain.getBaseGeoDomains(lat, lon, error_m);
        for (let baseGeoDomain of baseGeoDomains) {
            geoDomains.push(LocationToGeoDomain.formAddressFromDigits(baseGeoDomain, altitudeString, suffix));
            if (exploreUnknownAltitude && altitudeString !== CONFIG.UNKOWN_ALTITUDE_CODE) {
                geoDomains.push(LocationToGeoDomain.formAddressFromDigits(baseGeoDomain, CONFIG.UNKOWN_ALTITUDE_CODE, suffix));
            }

            for (let parent of LocationToGeoDomain.getParents(baseGeoDomain)) {
                geoDomains.push(LocationToGeoDomain.formAddressFromDigits(parent, altitudeString, suffix));
                if (exploreUnknownAltitude && altitudeString !== CONFIG.UNKOWN_ALTITUDE_CODE) {
                    geoDomains.push(LocationToGeoDomain.formAddressFromDigits(parent, CONFIG.UNKOWN_ALTITUDE_CODE, suffix));
                }
            }
        }
        // Get unique geo domains
        return Array.from(new Set(geoDomains));
    }
}

export { LocationToGeoDomain };
