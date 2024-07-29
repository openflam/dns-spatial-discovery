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
                '8834f22144', '8834f22149', '8834f2214d', '8834f2214f',
                '8834f22151', '8834f221521', '8834f221575', '8834f2215c',
                '8834f22167', '8834f22169'
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
                '8834f22144', '8834f22149', '8834f2214d', '8834f2214f',
                '8834f22151', '8834f221524', '8834f22157', '8834f2215c',
                '8834f22167', '8834f22169'
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

