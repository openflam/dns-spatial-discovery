/**
 * @file Mocks a Map server that has the discovery service implemented.
 */

import MockAdapter from "axios-mock-adapter";

const urls: [string] = [
    "https://india-mapserver.gov.in",
];

interface MapInfo {
  name: string;
  url: string;
}
interface DiscoveryServiceResponse {
  count: number;
  maps: MapInfo[];
}

function mockDiscoveryServer(mockAdapter: MockAdapter) {

    const discoveryResponse: DiscoveryServiceResponse = {
        count: 1,
        maps: [
            {
                name: "Population Map",
                url: "/maps/population",
            },
            {
                name: "Bangalore Map",
                url: "/maps/bangalore",
            }
        ],
    };

    for (const url of urls) {
        mockAdapter.onGet(`${url}/discovery`).reply(200, discoveryResponse);

        // Mock get capabilities
        mockAdapter.onGet(`${url}/capabilities`).reply(200,
            {
                "commonName": "India Dummy Map Server",
                "iconURL": "/icon",
                "services": [
                    {
                        "name": "discovery",
                        "url": "/discovery",
                    },
                ]
            }
        );
    }
}

export { mockDiscoveryServer };