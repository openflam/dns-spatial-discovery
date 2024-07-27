import { DNS } from './dns';
import { LocationToGeoDomain } from './location-to-geo-domain';
import { MapServer, LocalizationData, Pose } from '../localization/map-server';
import { DNSRecord } from './dns';
import { CONFIG } from '../config';
import { consoleLog } from '../utils/log';
import Events from '../utils/events';


// Nameserver and the DNS object to use for querying DNS records from this name server
// This is to prevent caches from different name servers from mixing up
class Nameserver {
    name: string;
    dnsObj: DNS;

    constructor(name: string) {
        this.name = name;
        this.dnsObj = new DNS();
    }

    async lookup(domain: string, type: string): Promise<DNSRecord[]> {
        return this.dnsObj.dnsLookup(domain, type, this.name);
    }
}

// Queue of name servers
class NameserverQueue {
    // Queue
    queue: Nameserver[];

    constructor() {
        this.queue = [];
    }

    // Add a record to the queue
    add(nameserver: Nameserver): void {
        this.queue.push(nameserver);
    }

    // Get a record from the queue
    get(): Nameserver | null {
        if (this.queue.length === 0) {
            return null;
        }
        return this.queue.shift();
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}

enum MapEvents {
    goodMapFound = 'mapfound:good',
    poorMapFound = 'mapfound:poor',
    noMapFound = 'nomap',
};

class MapsDiscovery {
    // Root name server
    rootNameserver: string = CONFIG.DoH_URL;

    // The default suffix to use for the geo domains if not provided
    // in the function calls to discoverMapServers and localize
    suffix: string;

    // Queue for name servers to maintain discovered name servers
    nameserverQueue: NameserverQueue = new NameserverQueue();

    // Name-based filter to apply to the list of servers
    // Default is to accept all names
    nameFilter: (name: string) => boolean = (name: string) => true;

    // Currently discovered map servers dictionary with the domain name as the key
    mapServers: { [key: string]: MapServer } = {};

    // Currently active server that is being used for localization
    activeServer: MapServer | null = null;

    // Acceptable error in meters. If the error is higher than this value,
    // relocation/map discovery is triggered.
    errorThreshold_m: number = 1;

    // Server confidence threshold. If the server confidence is lower than this value,
    //  relocation/map discovery is triggered.
    // NOTE: Preference is always given to errorThreshold_m to make the decision.
    //  serverConfidenceThreshold is used only if errorThreshold_m is not set (eg. VIO pose not passed in).
    serverConfidenceThreshold: number = 300;

    // Localization round. This is used to keep track of the number of localizations.
    // This is used to make sure that the localization is not done multiple times for a single data blob.
    // It is incremented whenever the localize function is called.
    currentLocalizationID: number = 0;

    constructor(suffix: string, rootNameserver: string = CONFIG.DoH_URL) {
        this.suffix = suffix;
        this.rootNameserver = rootNameserver;
        // Add the root name server to the queue
        let rootNameserverObj = new Nameserver(this.rootNameserver);
        this.nameserverQueue.add(rootNameserverObj);
    }

    /**
     * 
     * @param lat Latitude
     * @param lon Longitude
     * @param error_m Error in meters
     * @param suffix The suffix to append to the geo domains.
     * @returns Domains to query for the given location.
     */
    async discoverMapServers(
        lat: number, lon: number,
        error_m: number,
        suffix: string = this.suffix
    ): Promise<{ [name: string]: MapServer }> {
        while (!this.nameserverQueue.isEmpty()) {
            let nameserver = this.nameserverQueue.get();
            if (nameserver === null) {
                break;
            }
            await this.discoverMapsInNameserver(lat, lon, error_m, suffix, nameserver);
        }
        return this.mapServers;
    }

    async discoverMapsInNameserver(
        lat: number, lon: number,
        error_m: number,
        suffix: string,
        nameserver: Nameserver
    ): Promise<{ [name: string]: MapServer }> {
        const geoDomains = LocationToGeoDomain.getGeoDomains(lat, lon, error_m, suffix);
        let dnsLookupPromises: { [name: string]: Promise<DNSRecord[]> } = {};
        // Run all DNS lookups in parallel
        for (const domain of geoDomains) {
            dnsLookupPromises[domain] = nameserver.lookup(domain, 'TXT');
        }
        for (const domain in dnsLookupPromises) {
            let dnsLookupResults = await dnsLookupPromises[domain];
            for (const record of dnsLookupResults) {
                await this.updateMapServersFromDNSRecord(record);
            }
        }
        return this.mapServers;
    }

    async updateMapServersFromDNSRecord(record: DNSRecord) {
        if (!('data' in record)) {
            return;
        }
        // Parse the data field as JSON
        let recordData = record.data;
        const jsonString = recordData
            .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // Add double quotes around keys
            .replace(/:([a-zA-Z0-9_.]+)/g, ':"$1"') // Add double quotes around values
        const recordDataJSON = JSON.parse(jsonString);

        // Update map servers list if the record is of type MCNAME
        if (recordDataJSON.type === 'MCNAME') {
            let name = recordDataJSON.data;
            if (name in this.mapServers) {
                return; // Already discovered. Do not add again.
            }
            if (this.nameFilter(name)) {
                try {
                    let mapServer = new MapServer(name);
                    await mapServer.queryCapabilities();
                    this.mapServers[name] = mapServer;
                } catch (error) {
                    // If there is an error, the map server is not added to the list
                    consoleLog(error, 'error');
                }
            }
        }

        // Update the name server queue if the record is of type MNS
        if (recordDataJSON.type === 'MNS') {
            let name = recordDataJSON.data;
            if (name.endsWith('.')) {
                name = name.slice(0, -1);
            }
            if (this.nameFilter(name)) {
                let nameserver = new Nameserver(`https://${name}`);
                this.nameserverQueue.add(nameserver);
            }
        }
    }

    // Returns true if result1 is better than result2 in terms of errors/confidence
    isBetter(localization1: LocalizationData, localization2: LocalizationData | null): boolean {
        // If result2 is null, result1 is better.
        if (localization2 === null) {
            return true;
        }
        if ('errorWithVIO' in localization1 || 'errorWithVIO' in localization2) {
            // Compare the errors only if neither is Infinity
            if (localization1.errorWithVIO !== Infinity && localization2.errorWithVIO !== Infinity) {
                return localization1.errorWithVIO < localization2.errorWithVIO;
            }

            // Check if either is Infinity. If so, the other is better.
            if (localization1.errorWithVIO === Infinity && localization2.errorWithVIO !== Infinity) {
                return false;
            }
            else if (localization2.errorWithVIO === Infinity && localization1.errorWithVIO !== Infinity) {
                return true;
            }
        }
        if ('serverConfidence' in localization1 && 'serverConfidence' in localization2) {
            return localization1.serverConfidence > localization2.serverConfidence;
        }
        // if neither errorWithVIO nor serverConfidence is available, it's not possile to compare,
        // so return true. This is quite arbitrary.
        return true;
    }

    // Relocalize against the discovered servers and get the best localization result
    async #relocalizeWithinDiscoveredServers(
        dataBlob: Blob, localizationType: string,
        vioPose: Pose | null = null
    ): Promise<MapServer | null> {
        consoleLog('Relocalizing within the discovered servers', 'debug');
        // Filter out servers that do not support the localization type
        // and any excluded server
        let mapServersFiltered: { [name: string]: MapServer } = {};
        for (let name in this.mapServers) {
            let server = this.mapServers[name];
            if (server.capabilities.includes(localizationType)) {
                mapServersFiltered[name] = server;
            }
        }
        consoleLog(`Filtered servers: ${Object.keys(mapServersFiltered).join(', ')}`, 'debug');

        // Run all localizations in parallel
        let nameToLocalizationPromises: { [name: string]: Promise<LocalizationData> } = {};
        for (let name in mapServersFiltered) {
            let server = mapServersFiltered[name];

            let latestLocalizationData = server.getLatestLocalizationData();

            let isCallLocalize = false;
            // Localize if the server has no localization data.
            if (latestLocalizationData === null || latestLocalizationData.localizationID === null) {
                isCallLocalize = true;
            }

            // Localize if the server has localization data that is older than the current localization ID.
            else if (latestLocalizationData.localizationID < this.currentLocalizationID) {
                isCallLocalize = true;
            }
            if (isCallLocalize) {
                consoleLog(`Localizing against ${name}`, 'debug');
                nameToLocalizationPromises[name] = server.localize(dataBlob, localizationType, vioPose, this.currentLocalizationID);
            }
            else {
                consoleLog(`Not localizing against ${name} as the localization data is up-to-date`, 'debug');
                nameToLocalizationPromises[name] = Promise.resolve(latestLocalizationData);
            }
        }

        // Get the localization results
        let bestLocalizationData: LocalizationData | null = null;
        let bestServer: MapServer | null = null;
        for (let name in nameToLocalizationPromises) {
            let localizationData = await nameToLocalizationPromises[name];
            if (this.isBetter(localizationData, bestLocalizationData)) {
                bestLocalizationData = localizationData;
                bestServer = mapServersFiltered[name];
            }
        }

        return bestServer;
    }

    isServerAcceptable(mapServer: MapServer | null): boolean {
        if (mapServer === null) {
            return false;
        }
        let latestLocalizationData = mapServer.getLatestLocalizationData();
        if (latestLocalizationData === null) {
            return false;
        }
        if ('errorWithVIO' in latestLocalizationData) {
            return latestLocalizationData.errorWithVIO < this.errorThreshold_m;
        }
        if ('serverConfidence' in latestLocalizationData) {
            return latestLocalizationData.serverConfidence > this.serverConfidenceThreshold;
        }
        // If neither errorWithVIO nor serverConfidence is available
        // we cannot make a decision, so return true as it has some localization data
        return true;
    }

    // Called just before returning from the localize function.
    // 
    #raiseEventAndReturn(mapServer: MapServer, event: MapEvents | null = null) {
        if (event === null) {
            if (mapServer === null) {
                event = MapEvents.noMapFound;
            }
            else if (this.isServerAcceptable(mapServer)) {
                event = MapEvents.goodMapFound;
            }
            else {
                event = MapEvents.poorMapFound;
            }
        }
        Events.emit(event);

        return mapServer;
    }

    /*
    * Disocver and localize against the map servers.
    *
    * Try to continue using the active server.
    * If the localization error is too high, try to localize against the currently discovered servers.
    * If the localization error is still too high, re-initialize the discovery process.
    */
    async localize(
        lat: number, lon: number, error_m: number,
        dataBlob: Blob, localizationType: string,
        vioPose: Pose | null = null,
        suffix: string = this.suffix
    ): Promise<MapServer | null> {
        this.currentLocalizationID += 1;

        // If the current map server list is empty, discover map servers
        // and return the best possible server
        if ((Object.keys(this.mapServers).length === 0)
            || (this.activeServer === null)) {
            consoleLog('Discovering map servers as the current list is empty', 'debug');

            await this.discoverMapServers(lat, lon, error_m, suffix);
            let bestServer = await this.#relocalizeWithinDiscoveredServers(
                dataBlob, localizationType, vioPose);
            this.activeServer = bestServer;

            return this.#raiseEventAndReturn(this.activeServer);
        }

        // If active server is not null, localize against the active server first.
        consoleLog('Localizing against the active server', 'debug');
        await this.activeServer.localize(dataBlob, localizationType, vioPose, this.currentLocalizationID);
        if (this.isServerAcceptable(this.activeServer)) {
            consoleLog('Active server is acceptable', 'debug');
            return this.#raiseEventAndReturn(this.activeServer, MapEvents.goodMapFound);
        }

        // If the localization error is too high, relocalize against the discovered servers.
        consoleLog('Active server is not acceptable. So relocalizing against the discovered servers', 'debug');
        let bestServer = await this.#relocalizeWithinDiscoveredServers(
            dataBlob, localizationType, vioPose);
        if (this.isServerAcceptable(bestServer)) {
            this.activeServer = bestServer;
            return this.#raiseEventAndReturn(this.activeServer, MapEvents.goodMapFound);
        }

        // If the localization error is still too high, re-initialize the discovery process.
        // This time, just return the best possible server.
        consoleLog('Localization error is still too high. Re-initializing the discovery process', 'debug');
        await this.discoverMapServers(lat, lon, error_m, suffix);
        consoleLog('Relocalizing against the discovered servers', 'debug');
        bestServer = await this.#relocalizeWithinDiscoveredServers(
            dataBlob, localizationType, vioPose);
        this.activeServer = bestServer;
        return this.#raiseEventAndReturn(this.activeServer);
    }
}

export { MapsDiscovery };
