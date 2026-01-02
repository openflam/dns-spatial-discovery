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
  id?: number | null;
  building_id?: string | null;
  levels?: string[] | null;
}
interface DiscoveryServiceResponse {
  count: number;
  maps: MapInfo[];
}

function mockDiscoveryServer(mockAdapter: MockAdapter) {

    const discoveryResponse: DiscoveryServiceResponse = {
        count: 2,
        maps: [
            {
                name: "Population Map",
                url: "/maps/population",
                id: 11,
                building_id: "CIC",
                levels: ["L"]
            },
            {
                name: "Bangalore Map",
                url: "/maps/bangalore",
                id: 3,
                building_id: "CIC",
                levels: ["2"]
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