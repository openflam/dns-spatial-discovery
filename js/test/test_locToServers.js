describe('Location to Servers', function () {
    // Note that all of the test cases here are dependent on a records maintained on a
    // specific nameserver maintained at CMU. Because of the evolving nature of the project and hence
    // these DNS records, these will need to be updated on a regular basis.
    it('Should return the correct servers for a location 1', async function () {
        const lat = 40.444034531976556;
        const lon = -79.94661290569255;
        const error_m = 5;
        const discoveryObj = new dnsspatialdiscovery.LocationToServerAddr();
        const servers = await discoveryObj.getServersAddrs(lat, lon, error_m);
        const expectedServers = [
            'arena.wiselambda4.andrew.cmu.edu.'
        ]
        assert.deepEqual(servers, expectedServers);
    });

    it('Should return the correct servers for a location 2', async function () {
        const lat = 40.44403547793949;
        const lon = -79.9466203369454;
        const error_m = 5;
        const discoveryObj = new dnsspatialdiscovery.LocationToServerAddr();
        const servers = await discoveryObj.getServersAddrs(lat, lon, error_m);
        const expectedServers = [
            'cubicles.wiselambda4.andrew.cmu.edu.'
        ]
        assert.deepEqual(servers, expectedServers);
    });
});