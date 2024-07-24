import { MapServer } from "./map-server";
import { LocalizationResponse } from "./map-server";
import { Pose } from "./map-server";
import axios from "../axiosInstance";

async function queryLocalize(mapServer: MapServer,
    dataBlob: Blob, localizationType: string): Promise<LocalizationResponse> {

    let responseData: LocalizationResponse | null = null;

    const url = `https://${mapServer.name}/localize/${localizationType}`;

    // Send dataBlob to the server for localization
    const formData = new FormData();
    formData.append(localizationType, dataBlob);

    try {
        let response = await axios.post(url, formData);
        responseData = response.data;
    }
    catch (error) {
        // If there is an error, null is returned.
    }

    return responseData;
}

function errorBetweenPoses(pose1: Pose, pose2: Pose): number {
    return Math.sqrt(Math.pow(pose1[0][3] - pose2[0][3], 2)
        + Math.pow(pose1[1][3] - pose2[1][3], 2)
        + Math.pow(pose1[2][3] - pose2[2][3], 2));
}

export { queryLocalize, errorBetweenPoses };