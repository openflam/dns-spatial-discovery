import { DNS } from "./discovery/dns";
import { LocationToGeoDomain } from "./discovery/location-to-geo-domain";
import { Geometry } from "./types/geojson";
import { MapsDiscovery } from "./discovery/maps-discovery";
import { MapServer, LocalizationData, WayPoint, MapServerServiceDescription, MapServerCapabilities } from "./localization/map-server";
import axios from "./utils/axiosInstance";
import Events from "./utils/events";

// Imports for testing
import { s2CircleCoverer, s2PolygonCoverer } from "./region-coverer/region-coverer";
import { tokenToDomainDigits } from "./utils/s2-conversions";

var exportedForTesting = {
    s2CircleCoverer: s2CircleCoverer,
    s2PolygonCoverer: s2PolygonCoverer,
    tokenToDomainDigits: tokenToDomainDigits
};

export {
    DNS,
    LocationToGeoDomain,
    MapsDiscovery,
    MapServer,
    LocalizationData,
    WayPoint,
    MapServerServiceDescription,
    MapServerCapabilities,
    Geometry,
    axios,
    Events,
    exportedForTesting
};
