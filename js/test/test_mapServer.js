describe('MapServer', function () {
    it('Query capablities should work', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("arena-2300.cmu.edu");
        await mapServer.queryCapabilities();

        let expectedCapabilities = [
            "image"
        ];
        assert.sameMembers(mapServer.capabilities, expectedCapabilities);
    });

    it('Query waypoints should work', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("arena-2300.cmu.edu");
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
        let mapServer = new dnsspatialdiscovery.MapServer("arena-2300.cmu.edu");
        let imageBlob = new Blob(["01.png"]);
        let poseData = await mapServer.localize(imageBlob, "image");
        let expectedPoseData = {
            "serverConfidence": 9,
            "pose": [
                [
                    0.9548239195551376,
                    -0.014676762901239444,
                    -0.2968094932378424,
                    0.0
                ],
                [
                    -0.016698179532823654,
                    0.9945519115633762,
                    -0.1028963848049263,
                    0.0
                ],
                [
                    0.2967026347130298,
                    0.10320410765262529,
                    0.949376879178112,
                    0.0
                ],
                [
                    0.4336249785679676,
                    1.3008705581357356,
                    -0.4500139934263063,
                    1.0
                ]
            ]
        };

        assert.deepEqual(poseData, expectedPoseData);
        assert.deepEqual(mapServer.localizationDataList[0], expectedPoseData);

        // Latest localization data should be the same as the returned data
        assert.deepEqual(mapServer.getLatestLocalizationData(), expectedPoseData);
    });

    it('Localization request should work (with VIO)', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("arena-2300.cmu.edu");
        let image1Blob = new Blob(["01.png"]);

        let vioData = CLIENT_DATA[0].vioPose;
        let poseData = await mapServer.localize(image1Blob, "image", vioData);

        // First call
        let expectedPoseData = {
            serverConfidence: 9,
            pose: [
                [
                    0.9548239195551376,
                    -0.014676762901239444,
                    -0.2968094932378424,
                    0.0
                ],
                [
                    -0.016698179532823654,
                    0.9945519115633762,
                    -0.1028963848049263,
                    0.0
                ],
                [
                    0.2967026347130298,
                    0.10320410765262529,
                    0.949376879178112,
                    0.0
                ],
                [
                    0.4336249785679676,
                    1.3008705581357356,
                    -0.4500139934263063,
                    1.0
                ]
            ],
            vioPose: vioData,
            errorWithVIO: Infinity // Infinity since no past history is available
        };

        assert.deepEqual(poseData, expectedPoseData);

        // Second call
        poseData = await mapServer.localize(image1Blob, "image", vioData);
        expectedPoseData.errorWithVIO = 0.0;
        assert.deepEqual(poseData, expectedPoseData);
    });

    it('Localization request should raise error if capability is not supported', async function () {
        let mapServer = new dnsspatialdiscovery.MapServer("arena-2300.cmu.edu");
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