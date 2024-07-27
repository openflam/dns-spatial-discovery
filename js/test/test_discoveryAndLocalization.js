describe('Map Discovery and Localization', function () {
    it('MNS records should work', async function () {
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery("loc.", "https://loc-nameserver.net");
        await discoveryObj.discoverMapServers(
            CLIENT_DATA[0].lat,
            CLIENT_DATA[0].lon,
            CLIENT_DATA[0].error_m
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

    it('Sequence of best localization map server properties', async function () {
        const discoveryObj = new dnsspatialdiscovery.MapsDiscovery(
            "loc.", "https://loc-nameserver.net");
        let mapServerSequence = [];
        let errorWithVIOSequence = [];
        let serverConfidenceSequence = [];

        for (clientData of CLIENT_DATA) {
            let bestMapServer = await discoveryObj.localize(
                clientData.lat, clientData.lon, clientData.error_m,
                new Blob([clientData.imageName]), "image", clientData.vioPose
            );
            mapServerSequence.push(bestMapServer.name);
            errorWithVIOSequence.push(bestMapServer.getLatestLocalizationData().errorWithVIO);
            serverConfidenceSequence.push(bestMapServer.getLatestLocalizationData().serverConfidence);
        }

        const expectedMapServerSequence = [
            'lobby-2300.cmu.edu', 'lobby-2300.cmu.edu', 'arena-2300.cmu.edu',
            'lobby-2300.cmu.edu', 'lobby-2300.cmu.edu', 'lobby-2300.cmu.edu',
            'arena-2300.cmu.edu', 'arena-2300.cmu.edu', 'arena-2300.cmu.edu',
            'lobby-2300.cmu.edu', 'cubicles-maps.com', 'cubicles-maps.com',
            'cubicles-maps.com', 'cubicles-maps.com', 'cubicles-maps.com',
            'cubicles-maps.com', 'cubicles-maps.com'
        ];

        const expectedErrorWithVIOSequence = [
            Infinity, 0.12316416877108027, 0.08081753118143586, 1.5113356812956298,
            0.40358659873099945, 0.1631978429144243, 0.746340325453172,
            0.44149045162270817, 0.6846932581687384, 2.342597067376072,
            2.7645146475020486, 1.3963340398398092, 0.19778381065297723,
            0.4719355467410087, 0.01842731223921623, 0.18629017465157127,
            0.3653870704694482
        ]

        const expectedServerConfidenceSequence = [
            474, 426, 7, 304, 416, 108, 396, 224, 744, 20, 7,
            86, 142, 147, 535, 374, 364
        ];

        assert.deepEqual(mapServerSequence, expectedMapServerSequence);
        assert.deepEqual(errorWithVIOSequence, expectedErrorWithVIOSequence);
        assert.deepEqual(serverConfidenceSequence, expectedServerConfidenceSequence);
    });
});