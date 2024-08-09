import { DNS } from "./discovery/dns";
import { LocationToGeoDomain } from "./discovery/location-to-geo-domain";
import { MapsDiscovery } from "./discovery/maps-discovery";
import { MapServer, LocalizationData } from "./localization/map-server";
import axios from "./utils/axiosInstance";
import Events from "./utils/events";
import { s2CircleCoverer } from "./circle-coverer/circle-coverer";
import { tokenToDomainDigits } from "./utils/s2-conversions";
declare var exportedForTesting: {
    s2CircleCoverer: typeof s2CircleCoverer;
    tokenToDomainDigits: typeof tokenToDomainDigits;
};
export { DNS, LocationToGeoDomain, MapsDiscovery, MapServer, LocalizationData, axios, Events, exportedForTesting };
