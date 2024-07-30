interface DNSRecord {
    data?: string;
    TTL: number;
    timestamp?: number;
    error?: string;
    fromCache?: boolean;
}
declare class DNS {
    cache: {
        [domain: string]: {
            [type: string]: DNSRecord[];
        };
    };
    static DNS_TYPE_ID_TO_NAME: {
        [id: number]: string;
    };
    negativeCachingEnabled: boolean;
    constructor(negativeCachingEnabled?: boolean);
    /**
     * Add a record to the cache along with the timestamp.
     */
    addRecordToCache(domain: string, type: string, record: DNSRecord): void;
    /**
     * Get record from cache if available and if TTL has not expired.
     *
     */
    getRecordFromCache(domain: string, type: string): DNSRecord[] | null;
    /**
     * Get the requested DNS record of domain and given type. Try to use cache first.
     * If there are multiple records of the requested type, the first one is returned.
     * Add returned records to the cache even if they are not of the requested type.
     *
     * @param {string} domain - The domain name to lookup.
     * @param {string} type - The type of record to lookup (A, CNAME, PTR, TXT, LOC).
     * @returns {Promise} - A promise that resolves to an array of records or an error message
     *
     * The record objects contains the following relevant fields if the record is found:
     * - data: The IP address(for A type) or CNAME (for CNAME type) etc.
     * - TTL: Time to live in seconds
     *
     * If the record is not found, the following fields are present:
     * - error: 'NO-ANSWER'
     *
     * If the record was from the cache, the following fields are also present:
     * - timestamp: The time when the record was fetched if it is in the cache
     * - fromCache: true if the record was fetched from the cache
     */
    dnsLookup(domain: string, type: string, dohUrl?: string): Promise<DNSRecord[]>;
}
export { DNS, DNSRecord };
