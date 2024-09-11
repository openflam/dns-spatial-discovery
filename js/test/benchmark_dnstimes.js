describe('DNSQueryTimes', function () {
    it('Get query times (Copy code to console to get query times data)', async function () {
        return;

        let geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(
            CLIENT_DATA[0].lat,
            CLIENT_DATA[0].lon,
            CLIENT_DATA[0].error_m,
            "loc."
        );

        let queryTimes = {};

        // Run the benchmark 100 times to get multiple data points.
        for (i = 0; i < 100; i++) {
            // Iterate i from 1 to the length of geodomains. Launch queries in parallel for the first i geo-domains
            // and record the time taken to complete all queries.
            if (i % 10 === 0) {
                console.log("Iteration: " + (i + 1));
            }
            for (let i = 1; i <= geoDomains.length; i++) {
                let dnsObj = new dnsspatialdiscovery.DNS();
                let start = Date.now();
                let promises = [];
                for (let j = 0; j < i; j++) {
                    promises.push(dnsObj.dnsLookup(geoDomains[j], "TXT"));
                }
                await Promise.all(promises);
                let end = Date.now();

                if (!queryTimes[i]) {
                    queryTimes[i] = [];
                }
                queryTimes[i].push(end - start);
            }
        }

        assert.strictEqual(queryTimes.length, geoDomains.length);
    });
});