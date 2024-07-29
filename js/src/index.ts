import { DNS } from "./discovery/dns";
import { LocationToGeoDomain } from "./discovery/location-to-geo-domain";
import { MapsDiscovery } from "./discovery/maps-discovery";
import { MapServer } from "./localization/map-server";
import axios from "./utils/axiosInstance";
import Events from "./utils/events";

// Imports for testing
import { s2CircleCoverer } from "./circle-coverer/circle-coverer";
import { tokenToDomainDigits } from "./utils/s2-conversions";

var exportedForTesting = {
    s2CircleCoverer: s2CircleCoverer,
    tokenToDomainDigits: tokenToDomainDigits
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
