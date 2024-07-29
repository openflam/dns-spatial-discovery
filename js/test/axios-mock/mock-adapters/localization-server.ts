import MockAdapter from "axios-mock-adapter";
import { ARENA_MAP_RESPONSE } from "./localization-data/arena";
import { CUBICLES_MAP_REPONSE } from "./localization-data/cubicles";
import { PASSAGEWAY_MAP_REPONSE } from "./localization-data/passageway";
import { LOBBY_MAP_REPONSE } from "./localization-data/lobby";

const urlToMapResponse: { [url: string]: { [imageName: string]: LocalizationResponse } } = {
    "https://arena-2300.cmu.edu": ARENA_MAP_RESPONSE,
    "https://cubicles-maps.com": CUBICLES_MAP_REPONSE,
    "https://passageway-2300.com": PASSAGEWAY_MAP_REPONSE,
    "https://lobby-2300.cmu.edu": LOBBY_MAP_REPONSE,
};

type Pose = number[][];

// LocalizationResponse represents the response from the map server.
interface LocalizationResponse {
    pose: Pose;
    confidence?: number;
    [key: string]: any;
};

function mockLocalizationServer(mockAdapter: MockAdapter) {

    for (let url in urlToMapResponse) {
        // Mock post image
        mockAdapter.onPost(`${url}/localize/image`).reply(async (config) => {
            let imageBlob = config.data.get('image');
            let imageName = await imageBlob.text();
            return [200, urlToMapResponse[url][imageName]];
        });

        // Mock get waypoints
        mockAdapter.onGet(`${url}/waypoints`).reply(200, [
            {
                name: "waypoint1",
                position: [1.56, 5.6, 7.6]
            },
            {
                name: "waypoint2",
                position: [5.70, 4.84, 6.7]
            }
        ]);

        // Mock get capabilities
        mockAdapter.onGet(`${url}/capabilities`).reply(200, [
            "image"
        ]);
    }
}

export { mockLocalizationServer, LocalizationResponse };