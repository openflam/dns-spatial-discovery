/**
 * Contains functions to interact with the DNS.
 */
import { CONFIG } from "./config";

class DNS {
    // Cache to store the IP and CNAME of domains.
    // The key is a combination of the domain and the type of record.
    // For example, to access CNAME record for example.com, use cache['example.com']['CNAME'].
    cache = {};

    // Mapping from DNS type ID (returned by DoH request) to type name
    // Only a few types are supported.
    // From: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4
    static DNS_TYPE_ID_TO_NAME = {
        1: 'A',
        5: 'CNAME',
        12: 'PTR',
        16: 'TXT',
        29: 'LOC'
    };

    constructor(dohUrl = CONFIG.DoH_URL, negative_caching_enabled = CONFIG.NEGATIVE_CACHING_ENABLED) {
        this.dohUrl = dohUrl;
        this.negativeCachingEnabled = negative_caching_enabled
    }

    /**
     * Add a record to the cache along with the timestamp.
     */
    addRecordToCache(domain, type, record) {
        if (!(domain in this.cache)) {
            this.cache[domain] = {};
        }
        if (!(type in this.cache[domain])) {
            this.cache[domain][type] = [];
        }
        record['timestamp'] = Date.now();
        this.cache[domain][type].push(record);
    }

    /**
     * Get record from cache if available and if TTL has not expired.
     * 
     */
    getRecordFromCache(domain, type) {
        if (domain in this.cache && type in this.cache[domain]) {
            var cached_records = this.cache[domain][type];

            var recordsToReturn = [];
            var recordIndicesToRemove = [];
            for (let i = 0; i < cached_records.length; i++) {
                let record = cached_records[i];
                if ((Date.now() - record['timestamp']) < record.TTL * 1000) {
                    recordsToReturn.push(record);
                }
                // Mark record to be removed if TTL has expired
                else {
                    recordIndicesToRemove.push(i);
                }
            }
            // Remove records with expired TTL
            cached_records = cached_records.filter((record, index) => !recordIndicesToRemove.includes(index));
            this.cache[domain][type] = cached_records;

            // Return the records if there are any
            if (recordsToReturn.length > 0) {
                return recordsToReturn;
            }
        }
        return null;
    }

    /**
     * Get the the requested DNS record of domain and given type. Try to use cache first.
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
    async dnsLookup(domain, type) {
        if (!Object.values(DNS.DNS_TYPE_ID_TO_NAME).includes(type)) {
            throw new Error(`Unsupported DNS record type: ${type}. Supported types: ${Object.values(DNS.DNS_TYPE_ID_TO_NAME).join(', ')}`);
        }
        const cached_records = this.getRecordFromCache(domain, type);
        if (cached_records) {
            for (let record of cached_records) {
                record['fromCache'] = true;
            }
            return cached_records;
        }
        const url = `${this.dohUrl}?name=${domain}&type=${type}`;
        try {
            const response = await fetch(url, { headers: { accept: 'application/dns-json' } });
            if (!response.ok) {
                throw new Error('DoH request failed!');
            }
            const data = await response.json();

            // Check if the response contains the requested record type and return the first one
            // If no record of the requested type is found, throw an error
            if ('Answer' in data && data.Answer.length > 0) {
                var recordsToReturn = [];
                for (let record of data.Answer) {
                    // Add to cache
                    if (record.type in DNS.DNS_TYPE_ID_TO_NAME) {
                        this.addRecordToCache(domain, DNS.DNS_TYPE_ID_TO_NAME[record.type], record);
                    }
                    if (DNS.DNS_TYPE_ID_TO_NAME[record.type] === type) {
                        recordsToReturn.push(record);
                    }
                }
                if (recordsToReturn.length > 0) {
                    return recordsToReturn;
                }
            }
            // If no answer is found, cache the negative result if negative caching is enabled
            if ('Authority' in data && data.Authority.length > 0 && this.negativeCachingEnabled) {
                var soa_record = null;
                for (let record of data.Authority) {
                    if (record.type === 6) {
                        soa_record = record;
                        break;
                    }
                }
                if (soa_record) {
                    const soa_record_data = soa_record.data.split(' ');
                    // Negative caching TTL is the last field in the SOA record
                    const negative_caching_ttl = Number(soa_record_data[soa_record_data.length - 1]);
                    var negativeRecord = {
                        'error': 'NO-ANSWER',
                        'TTL': negative_caching_ttl
                    }
                    this.addRecordToCache(domain, type, negativeRecord);
                    return [negativeRecord];
                }
            }
            if (this.negativeCachingEnabled) {
                throw new Error('No answer or authority found in response!');
            }
        }
        catch (error) {
            return `ERROR: ${error.message}`
        }
    }
}

export { DNS };
