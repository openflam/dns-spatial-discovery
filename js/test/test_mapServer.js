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
});