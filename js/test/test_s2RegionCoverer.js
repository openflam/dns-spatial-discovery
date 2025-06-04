describe('s2RegionCoverer', function () {
    it('S2CircleCoverer should return the correct cells', async function () {
        var s2Cells = await dnsspatialdiscovery.exportedForTesting.s2CircleCoverer(
            {
                lat: parseFloat(CLIENT_DATA[0].lat),
                lng: parseFloat(CLIENT_DATA[0].lon),
            },
            50
        );
        assert.deepEqual(
            s2Cells,
            [
                '8834f22145', '8834f221464', '8834f22146c', '8834f2214e4',
                '8834f2214f4', '8834f2214fc', '8834f221504', '8834f2215b',
                '8834f2215c4', '8834f2215cc'
            ]
        );

        var s2Cells = await dnsspatialdiscovery.exportedForTesting.s2CircleCoverer(
            {
                lat: parseFloat(CLIENT_DATA[1].lat),
                lng: parseFloat(CLIENT_DATA[1].lon),
            },
            50
        );
        assert.deepEqual(
            s2Cells,
            [
                '8834f22145', '8834f2214e4', '8834f2214f4', '8834f2214fc',
                '8834f221504', '8834f22150c', '8834f2215b', '8834f2215c4',
                '8834f2215cc', '8834f2215d4'
            ]
        );
    });

    it('s2PolygonCoverer should return the correct cells', async function () {
        const polygon = [
            { lat: 40.44409098183695, lng: -79.946476440512 },
            { lat: 40.44401106839689, lng: -79.94656499937369 },
            { lat: 40.44389649371368, lng: -79.94654222709508 },
            { lat: 40.443857981142784, lng: -79.94640306316965 },
            { lat: 40.44384642737347, lng: -79.9462790807635 },
            { lat: 40.44405632062853, lng: -79.9461955824086 },
            { lat: 40.44409098183695, lng: -79.946476440512 }
        ]
        var s2Cells = await dnsspatialdiscovery.exportedForTesting.s2PolygonCoverer(polygon);
        const expectedCells = [
            "8834f22144b4",
            "8834f22144bc",
            "8834f22144d",
            "8834f22144f",
            "8834f221451",
            "8834f221453",
            "8834f2214544",
            "8834f221454c",
            "8834f2214564",
            "8834f221456c"
        ];
        assert.deepEqual(
            s2Cells,
            expectedCells
        );
    });

    it('s2PolygonCoverer should return the correct cells for exterior covering', async function () {
        const polygon = [
            { lat: 40.44409098183695, lng: -79.946476440512 },
            { lat: 40.44401106839689, lng: -79.94656499937369 },
            { lat: 40.44389649371368, lng: -79.94654222709508 },
            { lat: 40.443857981142784, lng: -79.94640306316965 },
            { lat: 40.44384642737347, lng: -79.9462790807635 },
            { lat: 40.44405632062853, lng: -79.9461955824086 },
            { lat: 40.44409098183695, lng: -79.946476440512 }
        ]
        var s2Cells = await dnsspatialdiscovery.exportedForTesting.s2PolygonCoverer(polygon, { interior: false });
        const expectedCells = [
            "8834f221444",
            "8834f22144c",
            "8834f221454",
            "8834f221459",
            "8834f22145b",
            "8834f2214fc",
            "8834f2215ac",
            "8834f2215b3",
            "8834f2215b5",
            "8834f2215cac"
        ];
        assert.deepEqual(
            s2Cells,
            expectedCells
        );
    });

    it('s2-utils should do the correct conversion from token to domain digits', async function () {
        var domainDigits = await dnsspatialdiscovery.exportedForTesting.tokenToDomainDigits('8834f22144');
        assert.deepEqual(
            domainDigits,
            [
                '0', '2', '2', '0', '0', '1', '0',
                '1', '2', '3', '1', '2', '2', '1',
                '0', '0', '1', '4'
            ]);
        domainDigits = await dnsspatialdiscovery.exportedForTesting.tokenToDomainDigits('8834f221521');
        assert.deepEqual(
            domainDigits,
            [
                '0', '0', '1', '2', '2', '2', '0',
                '0', '1', '0', '1', '2', '3', '1',
                '2', '2', '1', '0', '0', '1', '4'
            ]);
    });
});

