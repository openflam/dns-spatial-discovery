describe('MapServer', function () {
    it('Query capablities should work', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("mock-map-server.com");
        await mapServer.queryCapabilities();

        let expectedCapabilities = [
            "image",
            "uwb-beacon",
            "qr-code"
        ];
        assert.sameMembers(mapServer.capabilities, expectedCapabilities);
    });

    it('Query waypoints should work', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("mock-map-server.com");
        await mapServer.queryWaypoints();

        let expectedWaypoints = [
            {
                name: "waypoint1",
                position: [1.56, 5.6, 7.6]
            },
            {
                name: "waypoint2",
                position: [5.70, 4.84, 6.7]
            }
        ];
        assert.sameDeepMembers(mapServer.waypointsList, expectedWaypoints);
    });
});