describe('Map Discovery and Localization', function () {
    it('MNS records should work', async function () {
        const lat = 40.444034531976556;
        const lon = -79.94661290569255;
        const error_m = 5;
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("https://loc-nameserver.net");
        await discoveryObj.discoverMapServers(lat, lon, error_m, 'loc.');
        const servers = Object.values(discoveryObj.mapServers).map(
            (mapServer) => mapServer.name
        );
        const expectedServers = [
            "cic-maps.com"
        ]
        assert.sameMembers(servers, expectedServers);
    });
});