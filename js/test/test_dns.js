describe('DNS', function () {
    it('Should return the correct DNS record for the given domain and type', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const record = await dns.dnsLookup('example.com', 'A');
        assert.isOk('data' in record);
    });

    it('Should not use cache for first request.', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');
        assert.isOk(!('fromCache' in firstResponse));
    });

    it('Should use cache for repeated requests.', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');
        const secondResponse = await dns.dnsLookup('example.com', 'A');
        assert.isOk('fromCache' in secondResponse);
    });

    it('Check if error records are returned correctly.', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const record = await dns.dnsLookup('random.example.com', 'A');
        assert.isOk('error' in record);
    });

    it('Check if error is cached.', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('random.example.com', 'A');
        const secondResponse = await dns.dnsLookup('random.example.com', 'A');
        assert.isOk('fromCache' in secondResponse);
    });

    it('Check if cached record is not returned after TTL expiry.', async function () {
        const dns = new dnsspatialdiscovery.DNS();
        const firstResponse = await dns.dnsLookup('example.com', 'A');

        // Artificially set TTL to 0
        dns.cache['example.com']['A']['TTL'] = 0;
        const secondResponse = await dns.dnsLookup('example.com', 'A');
        assert.isOk(!('fromCache' in secondResponse));
    });
});