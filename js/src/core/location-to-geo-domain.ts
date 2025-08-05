import { s2CircleCoverer, s2PolygonCoverer } from "../region-coverer/region-coverer";
import { tokensToDomainDigits } from "../utils/s2-conversions";
import { CONFIG } from "../config";
import type { Geometry } from '../types/geojson';

type LatLng = {
    lat: number;
    lng: number;
};

const checkClockwise = (points: LatLng[]): boolean => {
    var sum = 0;
    for (var i = 0; i < points.length; i++) {
        var p1 = points[i];
        var p2 = points[(i + 1) % points.length];
        sum += (p2.lng - p1.lng) * (p2.lat + p1.lat);
    }
    return sum < 0;
}

class LocationToGeoDomain {
    static async getBaseGeoDomains(geometry: Geometry): Promise<string[][]> {
        let baseGeoDomains: string[][];
        if (geometry.type === 'Circle') {
            const lat = geometry.coordinates[1];
            const lon = geometry.coordinates[0];
            const radius = geometry.radius;

            const s2Tokens = await s2CircleCoverer({ lat: lat, lng: lon }, radius);
            baseGeoDomains = await tokensToDomainDigits(s2Tokens);
        }
        else if (geometry.type === 'Polygon') {
            var polygon: LatLng[] = [];
            for (let coord of geometry.coordinates[0]) {
                polygon.push({ lat: coord[1], lng: coord[0] });
            }
            // Check if the polygon is clockwise
            if (!checkClockwise(polygon)) {
                // Reverse the polygon if it is not clockwise
                polygon = polygon.reverse();
            }
            const s2Tokens = await s2PolygonCoverer(polygon);
            baseGeoDomains = await tokensToDomainDigits(s2Tokens);
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
