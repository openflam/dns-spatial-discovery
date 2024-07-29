describe('s2CircleCoverer', function () {
    it('S2CircleCoverer should return the correct cells', async function () {
        var s2Cells = await dnsspatialdiscovery.exportedForTesting.s2CircleCoverer(
            parseFloat(CLIENT_DATA[0].lat),
            parseFloat(CLIENT_DATA[0].lon),
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
            parseFloat(CLIENT_DATA[1].lat),
            parseFloat(CLIENT_DATA[1].lon),
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

