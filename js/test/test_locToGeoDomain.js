describe('Location to Geo Domain', function () {
    it('Should return the correct base geo domain for the given location', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(lat, lon, error_m);

        const expectedBaseGeoDomains = [
            ['3', '3', '2', '2', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['3', '2', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '3', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '2', '3', '3', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['1', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '0', '2', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['1', '3', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '3', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return base geo domain for very low error', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 0.00001;
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(lat, lon, error_m);
        const expectedBaseGeoDomains = [
            ['3', '2', '3', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return base geo domain for very high error', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 123456;
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(lat, lon, error_m);

        const expectedBaseGeoDomains = [
            ['2', '0', '2', '1', '0', '0', '1', '4'],
            ['1', '2', '1', '0', '0', '1', '4'],
            ['2', '2', '1', '0', '0', '1', '4'],
            ['0', '3', '2', '1', '0', '0', '1', '4'],
            ['1', '3', '2', '1', '0', '0', '1', '4'],
            ['3', '3', '3', '0', '1', '2', '0', '0', '1', '4'],
            ['1', '1', '2', '0', '0', '1', '4'],
            ['2', '2', '2', '2', '2', '1', '3', '0', '1', '4'],
            ['1', '1', '2', '3', '0', '1', '4'],
            ['2', '1', '2', '3', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return the correct geo domains for the given location', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(lat, lon, error_m, 'loc.arenaxr.org');

        const expectedGeoDomains = [
            "3.3.2.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.2.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.1.0.0.1.4.loc.arenaxr.org",
            "1.0.0.1.4.loc.arenaxr.org",
            "0.0.1.4.loc.arenaxr.org",
            "0.1.4.loc.arenaxr.org",
            "1.4.loc.arenaxr.org",
            "4.loc.arenaxr.org",
            "3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.2.3.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.0.2.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "0.2.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "1.3.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "3.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "2.3.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org"
        ];
        assert.deepEqual(geoDomains, expectedGeoDomains);
    });
});