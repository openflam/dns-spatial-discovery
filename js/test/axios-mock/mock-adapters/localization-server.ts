import MockAdapter from "axios-mock-adapter";

const mockServerURL = 'https://mock-map-server.com';

function mockLocalizationServer(mockAdapter: MockAdapter) {
    // Mock get capabilities
    mockAdapter.onGet(`${mockServerURL}/capabilities`).reply(200, [
        "image",
        "uwb-beacon",
        "qr-code"
    ]);

    // Mock get waypoints
    mockAdapter.onGet(`${mockServerURL}/waypoints`).reply(200, [
        {
            name: "waypoint1",
            position: [1.56, 5.6, 7.6]
        },
        {
            name: "waypoint2",
            position: [5.70, 4.84, 6.7]
        }
    ]);

    // Mock localization
    mockAdapter.onPost(`${mockServerURL}/localize/image`).reply(200, {
        pose: [
            [1, 0, 0, 1.56],
            [0, 1, 0, 5.6],
            [0, 0, 1, 7.6],
            [0, 0, 0, 1]
        ],
        confidence: 0.9
    });
}

export { mockLocalizationServer };