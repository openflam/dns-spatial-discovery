describe('Location to Geo Domain', function () {
    it('Should return the correct base geo domain for the given location', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(circleGeometry);

        const expectedBaseGeoDomains = [
            ['1', '0', '3', '2', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '1', '0', '3', '2', '0', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '0', '0', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['1', '0', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '0', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['3', '3', '1', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['3', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['0', '1', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4'],
            ['2', '3', '1', '3', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return base geo domain for very low error', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 0.00001;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(circleGeometry);
        const expectedBaseGeoDomains = [
            ['3', '2', '3', '2', '3', '1', '0', '2', '3', '3', '3', '0', '0', '1', '2', '3', '1', '2', '2', '1', '0', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return base geo domain for very high error', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 123456;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const baseGeoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getBaseGeoDomains(circleGeometry);

        const expectedBaseGeoDomains = [
            ['2', '1', '2', '1', '0', '0', '1', '4'],
            ['0', '3', '1', '2', '1', '0', '0', '1', '4'],
            ['3', '3', '1', '2', '1', '0', '0', '1', '4'],
            ['2', '2', '1', '0', '0', '1', '4'],
            ['3', '0', '3', '2', '1', '0', '0', '1', '4'],
            ['0', '1', '3', '2', '1', '0', '0', '1', '4'],
            ['1', '1', '3', '2', '1', '0', '0', '1', '4'],
            ['2', '1', '1', '1', '2', '3', '0', '1', '4'],
            ['2', '1', '1', '2', '3', '0', '1', '4'],
            ['1', '1', '2', '1', '2', '3', '0', '1', '4']
        ];
        assert.deepEqual(baseGeoDomains, expectedBaseGeoDomains);
    });

    it('Should return the correct geo domains for the given location and unkown altitude', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(circleGeometry, 'loc.arenaxr.org');

        const expectedGeoDomains = [
            "U.1.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.1.4.loc.arenaxr.org",
            "U.0.1.4.loc.arenaxr.org",
            "U.1.4.loc.arenaxr.org",
            "U.4.loc.arenaxr.org",
            "U.0.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org"
        ]
        assert.deepEqual(geoDomains, expectedGeoDomains);
    });

    it('Should return the correct geo domains for the given location and known altitude', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const altitude = 6.56;
        const geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(
            circleGeometry, 'loc.arenaxr.org', altitude);

        const expectedGeoDomains = [
            "7.1.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.1.4.loc.arenaxr.org",
            "7.0.1.4.loc.arenaxr.org",
            "7.1.4.loc.arenaxr.org",
            "7.4.loc.arenaxr.org",
            "7.0.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org"
        ]
        assert.deepEqual(geoDomains, expectedGeoDomains);
    });

    it('Should return the correct geo domains for known altitude and unknown altitude exploration', async function () {
        const lat = 40.44;
        const lon = -79.94;
        const error_m = 5;
        const circleGeometry = {
            'type': 'Circle',
            'coordinates': [lon, lat],
            'radius': error_m
        };
        const altitude = 6.56;
        const exploreUnknownAltitude = true;
        const geoDomains = await dnsspatialdiscovery.LocationToGeoDomain.getGeoDomains(
            circleGeometry, 'loc.arenaxr.org', altitude, exploreUnknownAltitude);

        const expectedGeoDomains = [
            "7.1.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.1.4.loc.arenaxr.org",
            "U.0.0.1.4.loc.arenaxr.org",
            "7.0.1.4.loc.arenaxr.org",
            "U.0.1.4.loc.arenaxr.org",
            "7.1.4.loc.arenaxr.org",
            "U.1.4.loc.arenaxr.org",
            "7.4.loc.arenaxr.org",
            "U.4.loc.arenaxr.org",
            "7.0.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.0.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.0.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.2.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.0.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.0.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.2.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.2.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "7.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org",
            "U.3.1.3.3.1.0.2.3.3.3.0.0.1.2.3.1.2.2.1.0.0.1.4.loc.arenaxr.org"
        ]
        assert.deepEqual(geoDomains, expectedGeoDomains);
    });
});