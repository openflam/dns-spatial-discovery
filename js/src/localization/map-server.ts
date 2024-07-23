class Pose {
    poseMatrix: number[][];
}

class WayPoint {
    name: string;
    position: number[];
}

/**
 * Represents a map server. It has all the metadata and data associated with a map server.
 * The poses returned by the map server along with thieir errors are stored in this object.
 */
class MapServer {
    // The domain name of the map server.
    name: string;

    // List of waypoints in the map.
    waypointsList: WayPoint[];

    // The list of capabilities supported by the map server.
    capabilities: string[];

    // Poses obtained from the map server after localization.
    poseList: Pose[];

    // VIO poses corresponding to the poses in poseList.
    VIOPoseAtQueryTime: Pose[];

    // Errors associated with the poses in poseList compared to the VIO poses.
    errorsWithVIO: number[];
}

export { MapServer, Pose, WayPoint };