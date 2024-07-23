import MockAdapter from "axios-mock-adapter";

const mockServerURL = 'https://mock-map-server.com';

function mockLocalizationServer(mockAdapter: MockAdapter) {
    // Mock get capabilities
    mockAdapter.onGet(`${mockServerURL}/capabilities`).reply(200, [
        "image",
        "uwb-beacon",
        "qr-code"
    ]);
}

export { mockLocalizationServer };