import { subtract, norm, abs } from "mathjs";
import { LocalizationData, MapServer } from "./map-server";
import { LocalizationResponse } from "./map-server";
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

function errorWithVIO(mapServer: MapServer, localizationData: LocalizationData): number {
    let prevLocalizationData = mapServer.getLatestLocalizationData();
    if (prevLocalizationData === null) {
        // If there is no previous localization data, cannot calculate error.
        return Infinity;
    }

    let prevPose = prevLocalizationData.pose;
    let prevPosition = [prevPose[0][3], prevPose[1][3], prevPose[2][3]];

    let currentPose = localizationData.pose;
    let currentPosition = [currentPose[0][3], currentPose[1][3], currentPose[2][3]];

    let vioPrevPose = prevLocalizationData.vioPose;
    let vioPrevPosition = [vioPrevPose[0][3], vioPrevPose[1][3], vioPrevPose[2][3]];

    let vioCurrentPose = localizationData.vioPose;
    let vioCurrentPosition = [vioCurrentPose[0][3], vioCurrentPose[1][3], vioCurrentPose[2][3]];

    let vector = subtract(currentPosition, prevPosition);
    let vioVector = subtract(vioCurrentPosition, vioPrevPosition);

    let vectorNorm = Number(norm(vector));
    let vioVectorNorm = Number(norm(vioVector));

    // Calculate the ratio of the lengths of the vectors as lengthError
    let lengthError = abs(vectorNorm - vioVectorNorm);

    return lengthError;
}

export { queryLocalize, errorWithVIO };