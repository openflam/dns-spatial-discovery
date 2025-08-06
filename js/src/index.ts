import { DNS } from "./core/dns";
import { LocationToGeoDomain } from "./core/location-to-geo-domain";
import { Geometry } from "./types/geojson";
import { MapsDiscovery } from "./core/maps-discovery";
import { MapServer, LocalizationData, WayPoint, MapServerServiceDescription, MapServerCapabilities } from "./core/map-server";
import { queryAllDiscoveryServices, queryDiscoveryService } from "./services/discover";
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

const Services = {
    // Discovery service for map servers
    queryAllDiscoveryServices: queryAllDiscoveryServices,
    queryDiscoveryService: queryDiscoveryService
}

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
    exportedForTesting,
    Services
};
