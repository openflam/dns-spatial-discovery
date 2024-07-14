describe('DNS', function () {
    it('Should return the correct DNS record for the given domain and type', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const record = await dns.dnsLookup('example.com', 'A');
        // Check if the record is not empty and contains the data field
        assert.isAbove(record.length, 0);
        assert.isOk('data' in record[0]);
    });

    it('Should not use cache for first request', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');
        for (let record of firstResponse) {
            assert.isOk(!('fromCache' in record));
        }
    });

    it('Should use cache for repeated requests', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');
        const secondResponse = await dns.dnsLookup('example.com', 'A');
        for (let record of secondResponse) {
            assert.isOk('fromCache' in record);
        }
    });

    it('Check if error records are returned correctly', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const records = await dns.dnsLookup('random.example.com', 'A');
        assert.isAbove(records.length, 0);
        assert.isOk('error' in records[0]);
    });

    it('Check if error is cached', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('random.example.com', 'A');
        const secondResponse = await dns.dnsLookup('random.example.com', 'A');
        assert.isAbove(secondResponse.length, 0);
        assert.isOk('fromCache' in secondResponse[0]);
    });

    it('Check if cached record is not returned after TTL expiry', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');

        // Artificially set TTL to 0
        for (let record of firstResponse) {
            record['TTL'] = 0;
        }
        const secondResponse = await dns.dnsLookup('example.com', 'A');
        for (let record of secondResponse) {
            assert.isOk(!('fromCache' in record));
        }
    });

    it('Check if cache is cleared and refreshed after TTL expiry', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');

        const firstCahceTimestamps = [];
        for (let record of dns.cache['example.com']['A']) {
            firstCahceTimestamps.push(record['timestamp']);
        }

        // Artificially set TTL to 0
        for (let record of dns.cache['example.com']['A']) {
            record['TTL'] = 0;
        }

        // Refresh cache by making another request
        const secondResponse = await dns.dnsLookup('example.com', 'A');
        const secondCahceTimestamps = [];
        for (let record of dns.cache['example.com']['A']) {
            secondCahceTimestamps.push(record['timestamp']);
        }

        // Check if the cache is cleared and refreshed by comparing the timestamps
        assert.strictEqual(firstCahceTimestamps.length, secondCahceTimestamps.length);
        for (let i = 0; i < firstCahceTimestamps.length; i++) {
            assert.isAbove(secondCahceTimestamps[i], firstCahceTimestamps[i]);
        }
    });
});