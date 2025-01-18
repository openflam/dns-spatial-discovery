declare class LocationToGeoDomain {
    static getBaseGeoDomains(lat: number, lon: number, error_m: number): Promise<string[][]>;
    static formAddressFromDigits(digits: string[], altitude: string, suffix: string): string;
    static getParents(domainDigits: string[]): string[][];
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
    static getGeoDomains(lat: number, lon: number, error_m: number, suffix: string, altitude?: number | string, exploreUnknownAltitude?: boolean): Promise<string[]>;
}
export { LocationToGeoDomain };
