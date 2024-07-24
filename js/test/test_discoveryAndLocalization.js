describe('Map Discovery and Localization', function () {
    let arenaCoords = {
        lat: 40.444034531976556,
        lon: -79.94661290569255,
        error_m: 5
    }

    it('MNS records should work', async function () {
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("https://loc-nameserver.net");
        await discoveryObj.discoverMapServers(
            arenaCoords.lat,
            arenaCoords.lon,
            arenaCoords.error_m,
            'loc.'
        );
        const servers = Object.values(discoveryObj.mapServers).map(
            (mapServer) => mapServer.name
        );
        const expectedServers = [
            "cic-maps.com"
        ]
        assert.sameMembers(servers, expectedServers);
    });
});