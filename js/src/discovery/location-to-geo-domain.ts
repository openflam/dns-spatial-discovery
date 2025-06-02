import { s2CircleCoverer } from "../circle-coverer/circle-coverer";
import { tokenToDomainDigits } from "../utils/s2-conversions";
import { CONFIG } from "../config";
import type { Geometry } from '../types/geojson';

class LocationToGeoDomain {
    static async getBaseGeoDomains(geometry: Geometry): Promise<string[][]> {
        const baseGeoDomains: string[][] = [];
        if (geometry.type === 'Circle') {
            const lat = geometry.coordinates[1];
            const lon = geometry.coordinates[0];
            const radius = geometry.radius;

            const s2Tokens = await s2CircleCoverer(lat, lon, radius);
            for (let s2Token of s2Tokens) {
                let domainDigits = await tokenToDomainDigits(s2Token);
                baseGeoDomains.push(domainDigits);
            }
        }
        else {
            // Not implemented for other geometry types yet
            throw new Error('Geometry type not supported. Only Circle is currently implemented.');
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
     * @param {Geometry} geometry The geometry object representing the location.
     * @param {String} suffix The suffix to append to the geo domains. Default is from the config file.
     * @param {Number} altitude Altitude in feet. If it unknown, pass 'U'.
     * @param {Boolean} exploreUnknownAltitude If true, explore unknown altitude. If false, explore only the given altitude.
     * @returns Geo domains for the given location. Includes the base geo domain, siblings and all parent geo domains.
    */
    static async getGeoDomains(geometry: Geometry, suffix: string,
        altitude: number | string = CONFIG.UNKOWN_ALTITUDE_CODE, exploreUnknownAltitude: boolean = false): Promise<string[]> {
        // Convert altitude to string
        let altitudeString: string = '';
        if (typeof altitude === 'string') {
            altitudeString = altitude;
        } else if (typeof altitude === 'number') {
            altitudeString = Math.round(Number(altitude)).toString();
        }

        const geoDomains: string[] = [];
        const baseGeoDomains = await LocationToGeoDomain.getBaseGeoDomains(geometry);
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
