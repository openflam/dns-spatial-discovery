describe('Location to Geo Domain', function () {
    it('Should return the correct base geo domain for the given location', function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const baseGeoDomain = dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomain(lat, lon, error_m);

        const expectedBaseGeoDomain = ['3', '2', '3', '1', '0', '2', '3',
            '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'];
        assert.deepEqual(baseGeoDomain, expectedBaseGeoDomain);
    });

    it('Should return base geo domain for very low error', function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 0.00001;
        const baseGeoDomain = dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomain(lat, lon, error_m);

        const expectedBaseGeoDomain = ['2', '0', '0', '1', '0', '0', '2', '3', '2', '3', '2', '3', '1', '0',
            '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'];

        assert.lengthOf(baseGeoDomain, 31);
        assert.deepEqual(baseGeoDomain, expectedBaseGeoDomain);
    });

    it('Should return base geo domain for very high error', function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 123456789;
        const baseGeoDomain = dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomain(lat, lon, error_m);

        const expectedBaseGeoDomain = ['1', '4'];

        assert.lengthOf(baseGeoDomain, 2);
        assert.deepEqual(baseGeoDomain, expectedBaseGeoDomain);
    });

    it('Should return the correct geo domains for the given location', function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const geoDomains = dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(lat, lon, error_m);

        const expectedGeoDomains = [
            '0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '3.1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '1.2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.2.1.0.0.1.4.loc.arenaxr.org',
            '2.1.0.0.1.4.loc.arenaxr.org',
            '1.0.0.1.4.loc.arenaxr.org',
            '0.0.1.4.loc.arenaxr.org',
            '0.1.4.loc.arenaxr.org',
            '1.4.loc.arenaxr.org',
            '4.loc.arenaxr.org'
        ];
        assert.deepEqual(geoDomains, expectedGeoDomains);
    });
});