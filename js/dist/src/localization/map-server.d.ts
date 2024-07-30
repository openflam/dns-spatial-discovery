type Pose = number[][];
interface WayPoint {
    name: string;
    position: number[];
}
interface LocalizationResponse {
    pose: Pose;
    confidence?: number;
}
interface LocalizationData {
    pose: Pose;
    vioPose?: Pose;
    serverConfidence?: number;
    errorWithVIO?: number;
    localizationID?: number;
}
/**
 * Represents a map server. It has all the metadata and data associated with a map server.
 * The poses returned by the map server along with thieir errors are stored in this object.
 */
declare class MapServer {
    name: string;
    waypointsList: WayPoint[];
    capabilities: string[];
    localizationDataList: LocalizationData[];
    constructor(name: string);
    queryCapabilities(): Promise<string[]>;
    queryWaypoints(): Promise<WayPoint[]>;
    localize(dataBlob: Blob, localizationType: string, currentVIOPose?: Pose | null, localizationID?: number | null): Promise<LocalizationData>;
    getLatestLocalizationData(): LocalizationData | null;
}
export { MapServer, Pose, WayPoint, LocalizationResponse, LocalizationData };
