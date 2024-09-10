describe('DNSQueryTimes', function () {
    it('Get query times (Copy code to console to get query times data)', async function () {
        let geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(
            CLIENT_DATA[0].lat,
            CLIENT_DATA[0].lon,
            CLIENT_DATA[0].error_m,
            "loc."
        );

        let queryTimes = [];

        // Iterate i from 1 to 50. Launch queries in parallel for the first i geo-domains
        // and record the time taken to complete all queries.
        for (let i = 1; i <= 50; i++) {
            let dnsObj = new dnsspatialdiscovery.DNS();
            let start = Date.now();
            let promises = [];
            for (let j = 0; j < i; j++) {
                promises.push(dnsObj.dnsLookup(geoDomains[j], "TXT"));
            }
            await Promise.all(promises);
            let end = Date.now();
            queryTimes.push({
                "numQueries": i,
                "time_ms": end - start
            });
        }

        assert.strictEqual(queryTimes.length, 50);
    });
});