describe('Location to Servers (temporary tests - dependent on DNS servers)', function () {
    // Note that all of the test cases here are dependent on a records maintained on a
    // specific nameserver maintained at CMU. Because of the evolving nature of the project and hence
    // these DNS records, these will need to be updated on a regular basis.
    describe('Uncached requests', function () {
        it('Should return the correct servers for a location 1 (CMU CIC 2300 Cubilces)', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "cicmaps.wiselambda4.andrew.cmu.edu."
            ]
            assert.sameMembers(servers, expectedServers);
        });

        it('Should return the correct servers for a location 2 (CMU CIC 2300 Arena)', async function () {
            const lat = 40.44403547793949;
            const lon = -79.9466203369454;
            const error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "cicmaps.wiselambda4.andrew.cmu.edu."
            ]
            assert.sameMembers(servers, expectedServers);
        });
    });

    describe('Cached requests', function () {
        var discoveryObj = null;

        before('Load DNS cache by making a request', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
            const servers = await discoveryObj.discoverMapServers(lat, lon, error_m);
        });

        it('Should return the correct servers for a location 1 (CMU CIC 2300 Cubilces)', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "cicmaps.wiselambda4.andrew.cmu.edu."
            ]
            assert.sameMembers(servers, expectedServers);
        });

        it('Should return the correct servers for a location 2 (CMU CIC 2300 Arena)', async function () {
            const lat = 40.44403547793949;
            const lon = -79.9466203369454;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "cicmaps.wiselambda4.andrew.cmu.edu."
            ]
            assert.sameMembers(servers, expectedServers);
        });
    });

    describe('Name filter', function () {
        it('Name filter: ends with .com', async function () {
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
            discoveryObj.nameFilter = (serverName) => serverName.endsWith('.com.');
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m,);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            assert.isEmpty(servers);
        });

        it('Name filter: ends with .edu', async function () {
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
            discoveryObj.nameFilter = (serverName) => serverName.endsWith('.edu.');
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "cicmaps.wiselambda4.andrew.cmu.edu."
            ]
            assert.sameMembers(servers, expectedServers);
        });
    });
});