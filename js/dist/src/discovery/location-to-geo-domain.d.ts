declare class LocationToGeoDomain {
    static getBaseGeoDomains(lat: number, lon: number, error_m: number): Promise<string[][]>;
    static formAddressFromDigits(digits: string[], suffix: string): string;
    static getParents(domainDigits: string[]): string[][];
    /**
     *
     * @param {Number} lat Latitude
     * @param {Number} lon Longitude
     * @param {Number} error_m Error in meters
     * @param {String} suffix The suffix to append to the geo domains. Default is from the config file.
     * @returns Geo domains for the given location. Includes the base geo domain, siblings and all parent geo domains.
     */
    static getGeoDomains(lat: number, lon: number, error_m: number, suffix: string): Promise<string[]>;
}
export { LocationToGeoDomain };
