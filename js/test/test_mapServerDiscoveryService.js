describe('Discovery Service', function () {
    it('Map discovery object should query the discovery service of the discovered maps', async function () {
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://india-ns.gov.in");
        const polygonGeometry = {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                    77.59218086392104,
                    12.976467543336014
                    ],
                    [
                    77.58916303133412,
                    12.969286923141368
                    ],
                    [
                    77.59008874685213,
                    12.968763704019622
                    ],
                    [
                    77.59912373030102,
                    12.976539709320605
                    ],
                    [
                    77.5969020130591,
                    12.98020210554155
                    ],
                    [
                    77.59566155426569,
                    12.980075816915488
                    ],
                    [
                    77.59218086392104,
                    12.976467543336014
                    ]
                ]
            ]};
        await discoveryObj.discoverMapServers(polygonGeometry);
        const servers = Object.values(discoveryObj.mapServers).map(
            (mapServer) => mapServer.name
        );
        const expectedServers = [
            "india-mapserver.gov.in",
            "india-mapserver.gov.in/maps/population",
            "india-mapserver.gov.in/maps/bangalore"
        ];
        assert.sameMembers(servers, expectedServers);
    });

    it('Discovery service of a single map server should work', async function () {
        const mapServer = new dnsspatialdiscovery.MapServer("india-mapserver.gov.in");
        const polygonGeometry = {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                    77.59218086392104,
                    12.976467543336014
                    ],
                    [
                    77.58916303133412,
                    12.969286923141368
                    ],
                    [
                    77.59008874685213,
                    12.968763704019622
                    ],
                    [
                    77.59912373030102,
                    12.976539709320605
                    ],
                    [
                    77.5969020130591,
                    12.98020210554155
                    ],
                    [
                    77.59566155426569,
                    12.980075816915488
                    ],
                    [
                    77.59218086392104,
                    12.976467543336014
                    ]
                ]
            ]};
        const childMapServersDiscovered = await dnsspatialdiscovery.Services.queryDiscoveryService(
            mapServer,
            polygonGeometry
        );
        const servers = Object.values(childMapServersDiscovered).map(
            (mapServer) => mapServer.name
        );
        const expectedServers = [
            "india-mapserver.gov.in/maps/population",
            "india-mapserver.gov.in/maps/bangalore"
        ];
        assert.sameMembers(servers, expectedServers);
    });
});