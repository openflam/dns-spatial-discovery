describe('Location to Servers', function () {
    // Note that all of the test cases here are dependent on a records maintained on a
    // specific nameserver maintained at CMU. Because of the evolving nature of the project and hence
    // these DNS records, these will need to be updated on a regular basis.
    describe('Uncached requests', function () {
        it('Should return the correct servers for location 1', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry);
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

        it('Should return the correct servers for polygon', async function () {
            const polygonGeometry = {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -79.94671797604462,
                            40.444304523242465
                        ],
                        [
                            -79.94687042194538,
                            40.44372619379834
                        ],
                        [
                            -79.94637843744837,
                            40.44361896499586
                        ],
                        [
                            -79.9462768068479,
                            40.4438386959647
                        ],
                        [
                            -79.9462929753527,
                            40.44433089072757
                        ],
                        [
                            -79.94671797604462,
                            40.444304523242465
                        ]
                    ]
                ]
            }
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(polygonGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const altitude = 6.56;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry, { altitude: altitude });
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const altitude = 6.56;
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry, { altitude: altitude, exploreUnknownAltitude: true });
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
            let circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry);
            let servers = Object.values(discoveryObj.mapServers).map(
                (mapServer) => mapServer.name
            );
            let expectedServers = [
            ]
            assert.sameMembers(servers, expectedServers);

            // Second attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            await discoveryObj.discoverMapServers(circleGeometry);
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
            let circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            let thisMapServers = await discoveryObj.discoverMapServers(circleGeometry);
            let servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            let expectedServers = [
            ]
            assert.sameMembers(servers, expectedServers);

            // Second attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            thisMapServers = await discoveryObj.discoverMapServers(circleGeometry);
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
            circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            thisMapServers = await discoveryObj.discoverMapServers(circleGeometry);
            servers = Object.values(thisMapServers).map(
                (mapServer) => mapServer.name
            );
            expectedServers = [
            ];
            assert.sameMembers(servers, expectedServers);

            // Fourth attempt
            lat = 40.44403547793949;
            lon = -79.9466203369454;
            circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            thisMapServers = await discoveryObj.discoverMapServers(circleGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://cmu-nameserver.cmu.edu");
            await discoveryObj.discoverMapServers(circleGeometry);
        });

        it('Should return the correct servers for a location 1 (CMU CIC 2300 Cubilces)', async function () {
            const lat = 40.444034531976556;
            const lon = -79.94661290569255;
            const error_m = 5;
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            await discoveryObj.discoverMapServers(circleGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            await discoveryObj.discoverMapServers(circleGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            await discoveryObj.discoverMapServers(circleGeometry);
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
            const circleGeometry = {
                'type': 'Circle',
                'coordinates': [lon, lat],
                'radius': error_m
            };
            await discoveryObj.discoverMapServers(circleGeometry);
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