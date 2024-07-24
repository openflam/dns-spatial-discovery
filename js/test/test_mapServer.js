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

    it('Localization request should work (without VIO)', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("mock-map-server.com");
        let emptyBlob = new Blob();
        let poseData = await mapServer.localize(emptyBlob, "image");
        let expectedPoseData = {
            serverConfidence: 0.9,
            pose: [
                [1, 0, 0, 1.56],
                [0, 1, 0, 5.6],
                [0, 0, 1, 7.6],
                [0, 0, 0, 1]
            ]
        };

        assert.deepEqual(poseData, expectedPoseData);
        assert.deepEqual(mapServer.localizationDataList[0], expectedPoseData);

        // Latest localization data should be the same as the returned data
        assert.deepEqual(mapServer.getLatestLocalizationData(), expectedPoseData);
    });

    it('Localization request should work (with VIO)', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("mock-map-server.com");
        let emptyBlob = new Blob();

        let vioData = [
            [1, 0, 0, 2.34],
            [0, 1, 0, 6.60],
            [0, 0, 1, 5.78],
            [0, 0, 0, 1.00]
        ];
        let poseData = await mapServer.localize(emptyBlob, "image", vioData);
        let expectedPoseData = {
            serverConfidence: 0.9,
            pose: [
                [1, 0, 0, 1.56],
                [0, 1, 0, 5.60],
                [0, 0, 1, 7.60],
                [0, 0, 0, 1.00]
            ],
            vioPose: vioData,
            errorWithVIO: 2.218287627878765
        };

        assert.equal(poseData.serverConfidence, expectedPoseData.serverConfidence);
        assert.deepEqual(poseData.pose, expectedPoseData.pose);
        assert.deepEqual(poseData.vioPose, expectedPoseData.vioPose);
        assert.closeTo(poseData.errorWithVIO, expectedPoseData.errorWithVIO, 0.0001);
    });

    it('Localization request should raise error if capability is not supported', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("mock-map-server.com");
        let emptyBlob = new Blob();

        let isErrorThrown = false;
        var errorMsg = null;
        try {
            await mapServer.localize(emptyBlob, "radar");
        } catch (error) {
            errorMsg = error;
            isErrorThrown = true;
        }
        assert.isOk(isErrorThrown);
        assert.include(errorMsg.message, "radar is not supported");
    });
});