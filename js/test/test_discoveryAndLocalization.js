describe('Map Discovery and Localization', function () {
    let arenaCoords = {
        lat: 40.444034531976556,
        lon: -79.94661290569255,
        error_m: 5
    }

    it('MNS records should work', async function () {
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://loc-nameserver.net");
        await discoveryObj.discoverMapServers(
            arenaCoords.lat,
            arenaCoords.lon,
            arenaCoords.error_m
        );
        const servers = Object.values(discoveryObj.mapServers).map(
            (mapServer) => mapServer.name
        );
        const expectedServers = [
            'arena-2300.cmu.edu',
            'cubicles-maps.com',
            'lobby-2300.cmu.edu',
            'passageway-2300.com'
        ]
        assert.sameMembers(servers, expectedServers);
    });
});