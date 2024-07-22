import { CONFIG } from './config';
import S2 from 's2-geometry';

class LocationToGeoDomain {
    // Table from http://s2geometry.io/resources/s2cell_statistics
    // Dictionary from area (m^2) to level
    static area_m2_to_level: { [area: number]: number } = {
        0.000093: 30,
        0.000371: 29,
        0.001485: 28,
        0.005939: 27,
        0.023756: 26,
        0.095023: 25,
        0.38: 24,
        1.52: 23,
        6.08: 22,
        24.33: 21,
        97.30: 20,
        389.21: 19,
        1556.86: 18,
        6227.43: 17,
        24909.73: 16,
        99638.93: 15,
        400000: 14,
        1590000: 13,
        6380000: 12,
        25510000: 11,
        102030000: 10,
        408120000: 9,
        1632450000: 8,
        6529090000: 7,
        26113300000: 6,
        104297910000: 5,
        413918150000: 4,
        1646455500000: 3,
        6026521160000: 2,
        21252753050000: 1
    };

    static errorToLevel(error_m: number): number {
        const query_area = Math.PI * Math.pow(error_m, 2);
        const areas = Object.keys(LocationToGeoDomain.area_m2_to_level).map(Number).sort((a, b) => a - b);
        let level: number | null = null;

        // Get the last level that has an area <= to the query area
        for (const area of areas) {
            if (area <= query_area) {
                level = LocationToGeoDomain.area_m2_to_level[area];
            } else {
                break;
            }
        }
        if (level === null) {
            // This means the query_area is too small (or error is too low), 
            // so we return the smallest area level
            level = 30;
        }
        return level;
    }

    static getS2CellKey(lat: number, lon: number, level: number): string {
        return S2.latLngToKey(lat, lon, level);
    }

    static getGeoDomainFromS2CellKey(s2CellKey: string): string[] {
        const parts = s2CellKey.split('/');
        const face = parts[0];
        let position = parts[1];
        let digits = position.split('');
        // Reverse the digits as we want the 'smallest' level to be at the beginning 
        // of the address
        digits = digits.reverse();
        digits.push(face);
        return digits;
    }

    static getBaseGeoDomain(lat: number, lon: number, error_m: number): string[] {
        const level = LocationToGeoDomain.errorToLevel(error_m);
        const s2CellKey = LocationToGeoDomain.getS2CellKey(lat, lon, level);
        const digits = LocationToGeoDomain.getGeoDomainFromS2CellKey(s2CellKey);
        return digits;
    }

    static formAddressFromDigits(digits: string[], suffix: string = CONFIG.GEO_DOMAIN_SUFFIX): string {
        return digits.join('.') + '.' + suffix;
    }

    /**
     * 
     * @param {Number} lat Latitude
     * @param {Number} lon Longitude
     * @param {Number} error_m Error in meters
     * @param {String} suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Geo domains for the given location. Includes the base geo domain, siblings and all parent geo domains.
     */
    static getGeoDomains(lat: number, lon: number, error_m: number, suffix: string = CONFIG.GEO_DOMAIN_SUFFIX): string[] {
        const baseGeoDigits = LocationToGeoDomain.getBaseGeoDomain(lat, lon, error_m);
        const geoDomains: string[] = [];

        // Add the base geo domain and its siblings
        for (let i = 0; i < 4; i++) {
            let subBaseGeoDigits = baseGeoDigits.slice(1);
            subBaseGeoDigits.unshift(i.toString());
            geoDomains.push(LocationToGeoDomain.formAddressFromDigits(subBaseGeoDigits, suffix));
        }

        // Add all parent geo domains
        for (let i = 1; i < baseGeoDigits.length; i++) {
            let parentGeoDigits = baseGeoDigits.slice(i);
            geoDomains.push(LocationToGeoDomain.formAddressFromDigits(parentGeoDigits, suffix));
        }

        return geoDomains;
    }
}

export { LocationToGeoDomain };
