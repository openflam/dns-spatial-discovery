import { DNS } from './dns';
import { MapServer, LocalizationData, Pose } from '../localization/map-server';
import { DNSRecord } from './dns';
declare class Nameserver {
    name: string;
    dnsObj: DNS;
    constructor(name: string);
    lookup(domain: string, type: string): Promise<DNSRecord[]>;
}
declare class NameserverQueue {
    queue: Nameserver[];
    constructor();
    add(nameserver: Nameserver): void;
    get(): Nameserver | null;
    isEmpty(): boolean;
}
declare class MapsDiscovery {
    #private;
    rootNameserver: string;
    suffix: string;
    nameserverQueue: NameserverQueue;
    nameFilter: (name: string) => boolean;
    mapServers: {
        [key: string]: MapServer;
    };
    activeServer: MapServer | null;
    errorThreshold_m: number;
    serverConfidenceThreshold: number;
    currentLocalizationID: number;
    constructor(suffix: string, rootNameserver?: string);
    setServerConfidenceThreshold(serverConfidenceThreshold: number): void;
    setErrorThreshold(errorThreshold_m: number): void;
    /**
     *
     * @param lat Latitude
     * @param lon Longitude
     * @param error_m Error in meters
     * @param suffix The suffix to append to the geo domains.
     * @returns Domains to query for the given location.
     */
    discoverMapServers(lat: number, lon: number, error_m: number, suffix?: string): Promise<{
        [name: string]: MapServer;
    }>;
    discoverMapsInNameserver(lat: number, lon: number, error_m: number, suffix: string, nameserver: Nameserver): Promise<{
        [name: string]: MapServer;
    }>;
    updateMapServersFromDNSRecord(record: DNSRecord): Promise<void>;
    isBetter(localization1: LocalizationData, localization2: LocalizationData | null): boolean;
    isServerAcceptable(mapServer: MapServer | null): boolean;
    localize(lat: number, lon: number, error_m: number, dataBlob: Blob, localizationType: string, vioPose?: Pose | null, suffix?: string): Promise<MapServer | null>;
}
export { MapsDiscovery };
