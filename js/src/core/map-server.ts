import axios from "../utils/axiosInstance";
import { queryLocalize, errorWithVIO } from "../services/localization/localize";

// Pose is a 2D array of numbers. It represents the position and orientation.
type Pose = number[][];

interface WayPoint {
    name: string;
    position: number[];
    neighbors: string[];
}

// LocalizationResponse represents the response from the map server.
interface LocalizationResponse {
    pose: Pose;
    confidence?: number;
};

// LocalizationData is the pose and its metadata stored in the object.
interface LocalizationData {
    pose: Pose;
    vioPose?: Pose; // VIO pose at the time of query.
    serverConfidence?: number; // Confidence in the pose returned by the server.
    errorWithVIO?: number; // Error between the pose and VIO pose
    localizationID?: number; // The caller of localize() can set this. It is used to avoid duplicate localization.
};

interface ServiceDescription {
    name: string; // Name of the service.
    url: string; // URL of the service.
    [key: string]: any; // Additional properties can be added as needed.
}

interface MapServerCapabilities {
    commonName?: string; // Common name of the map server.
    iconURL?: string; // URL of the icon to be used for the map server.
    services?: ServiceDescription[]; // List of services provided by the map server.
}

/**
 * Represents a map server. It has all the metadata and data associated with a map server.
 * The poses returned by the map server along with thieir errors are stored in this object.
 */
class MapServer {
    // The domain name of the map server.
    name: string;

    // List of waypoints in the map.
    waypointsList: WayPoint[] = [];

    // The list of capabilities supported by the map server.
    capabilities: MapServerCapabilities = {};

    // The list of localization types supported by the map server.
    localizationTypesSupported: string[] = [];

    // History of localziation data returned by the map server.
    // The last entry is the most recent data.
    localizationDataList: LocalizationData[] = [];

    constructor(name: string) {
        this.name = name;
    }

    // Get server capabilities
    async queryCapabilities(): Promise<MapServerCapabilities> {
        const url = `https://${this.name}/capabilities`;
        try {
            const response = await axios.get(url, { 
                withCredentials: true 
            });
            this.capabilities = response.data;
            this.localizationTypesSupported = this.getLocalizationTypes(this.capabilities);
        }
        catch (error) {
            // If there is an error, capabilities remains as it was before.
        }
        return this.capabilities;
    }

    // Get the localization types supported from capabilities.
    getLocalizationTypes(capabilities: MapServerCapabilities): string[] {
        if (!('services' in capabilities) || capabilities.services.length === 0) {
            return [];
        }
        const localizationService = capabilities.services.find((service: ServiceDescription) => {
            return service.name === 'localization';
        });
        if (!localizationService || !('types' in localizationService)) {
            return [];
        }
        return localizationService.types;
    }

    async queryWaypoints(): Promise<WayPoint[]> {
        const url = `https://${this.name}/waypoints`;
        try {
            const response = await axios.get(url, { 
                withCredentials: true 
            });
            this.waypointsList = response.data;
        }
        catch (error) {
            // If there is an error, waypointsList remains as it was before.
        }
        return this.waypointsList;
    }

    async localize(dataBlob: Blob, localizationType: string,
        currentVIOPose: Pose | null = null,
        localizationID: number | null = null): Promise<LocalizationData> {

        if (Object.keys(this.capabilities).length === 0) {
            await this.queryCapabilities();
        }
        if (!this.localizationTypesSupported.includes(localizationType)) {
            throw new Error(`Localization type ${localizationType} is not supported by ${this.name}.`);
        }
        const localizationResponse = await queryLocalize(this, dataBlob, localizationType);
        if (localizationResponse === null) {
            throw new Error(`Localization failed for ${this.name}.`);
        }

        // Store the localization data in the object.
        const pose = localizationResponse.pose;
        const localizationData: LocalizationData = {
            pose: pose
        };
        if ('confidence' in localizationResponse) {
            localizationData.serverConfidence = localizationResponse.confidence;
        }

        if (currentVIOPose) {
            localizationData.vioPose = currentVIOPose;
            let error = errorWithVIO(this, localizationData);
            localizationData.errorWithVIO = error;
        }

        if (localizationID !== null) {
            localizationData.localizationID = localizationID;
        }

        this.localizationDataList.push(localizationData);

        return localizationData;
    }

    // Get the latest localization data.
    getLatestLocalizationData(): LocalizationData | null {
        if (this.localizationDataList.length === 0) {
            return null;
        }
        return this.localizationDataList[this.localizationDataList.length - 1];
    }
}

export {
    MapServer,
    Pose,
    WayPoint,
    LocalizationResponse,
    LocalizationData,
    ServiceDescription as MapServerServiceDescription,
    MapServerCapabilities
};