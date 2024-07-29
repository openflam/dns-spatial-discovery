import { DNS } from "./discovery/dns";
import { LocationToGeoDomain } from "./discovery/location-to-geo-domain";
import { MapsDiscovery } from "./discovery/maps-discovery";
import { MapServer } from "./localization/map-server";
import axios from "./utils/axiosInstance";
import Events from "./utils/events";
import { s2CircleCoverer } from "./circle-coverer/circle-coverer";

var exportedForTesting = {
    s2CircleCoverer: s2CircleCoverer
};

export {
    DNS,
    LocationToGeoDomain,
    MapsDiscovery,
    MapServer,
    axios,
    Events,
    exportedForTesting
};
