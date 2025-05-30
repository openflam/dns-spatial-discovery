describe('Location to Servers', function () {
    // Note that all of the test cases here are dependent on a records maintained on a
    // specific nameserver maintained at CMU. Because of the evolving nature of the project and hence
    // these DNS records, these will need to be updated on a regular basis.
    describe('Uncached requests', function () {
        it('Should return the correct servers for location 1', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m);
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

        it('Should return the correct servers for location 2', async function () {
            const lat = 40.44403547793949;
            const lon = -79.9466203369454;
            const error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m);
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

        it('Should return the correct servers for location with known altitude', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const altitude = 6.56;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m, altitude);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "known-altitude-map.cmu.edu"
            ];
            assert.sameMembers(servers, expectedServers);
        });

        it('Should return the correct servers for location with known altitude and unknown altitude exploration', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const altitude = 6.56;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m, altitude, true);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                "known-altitude-map.cmu.edu",
                "arena-2300.cmu.edu",
                "cubicles-maps.com",
                "lobby-2300.cmu.edu",
                "passageway-2300.com"
            ];
            assert.sameMembers(servers, expectedServers);
        });

        it('Multiple retires should work', async function () {
            let lat = 50.44403547793949;
            let lon = -89.9466203369454;
            let error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            let servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            let expectedServers = [
            ]
            assert.sameMembers(servers, expectedServers);

            // Second attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            expectedServers = [
                'arena-2300.cmu.edu',
                'cubicles-maps.com',
                'lobby-2300.cmu.edu',
                'passageway-2300.com'
            ]
            assert.sameMembers(servers, expectedServers);
        });

        it('Return value of discoverMapServers should be correct', async function () {
            let lat = 50.44403547793949;
            let lon = -89.9466203369454;
            let error_m = 5;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            let thisMapServers = await discoveryObj.discoverMapServers(lat, lon, error_m);
            let servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            let expectedServers = [
            ]
            assert.sameMembers(servers, expectedServers);

            // Second attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            thisMapServers = await discoveryObj.discoverMapServers(lat, lon, error_m);
            servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            expectedServers = [
                'arena-2300.cmu.edu',
                'cubicles-maps.com',
                'lobby-2300.cmu.edu',
                'passageway-2300.com'
            ]
            assert.sameMembers(servers, expectedServers);

            // Third attempt
            lat = 50.44403547793949;
            lon = -89.9466203369454;
            thisMapServers = await discoveryObj.discoverMapServers(lat, lon, error_m);
            servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            expectedServers = [
            ];
            assert.sameMembers(servers, expectedServers);

            // Fourth attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            thisMapServers = await discoveryObj.discoverMapServers(lat, lon, error_m);
            servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            expectedServers = [
                'arena-2300.cmu.edu',
                'cubicles-maps.com',
                'lobby-2300.cmu.edu',
                'passageway-2300.com'
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
            discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(lat, lon, error_m);
        });

        it('Should return the correct servers for a location 1 (CMU CIC 2300 Cubilces)', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m, 'loc.');
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

        it('Should return the correct servers for a location 2 (CMU CIC 2300 Arena)', async function () {
            const lat = 40.44403547793949;
            const lon = -79.9466203369454;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m, 'loc.');
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

    describe('Name filter', function () {
        it('Name filter: ends with .edu', async function () {
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            discoveryObj.nameFilter = (serverName) => serverName.endsWith('.edu');
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                'arena-2300.cmu.edu',
                'lobby-2300.cmu.edu'
            ]
            assert.sameMembers(servers, expectedServers);
        });

        it('Name filter: ends with .com', async function () {
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            discoveryObj.nameFilter = (serverName) => serverName.endsWith('.com');
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            await discoveryObj.discoverMapServers(lat, lon, error_m);
            const servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            const expectedServers = [
                'cubicles-maps.com',
                'passageway-2300.com'
            ]
            assert.sameMembers(servers, expectedServers);
        });
    });
});