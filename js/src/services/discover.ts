/**
 * @file Individual map servers can provide their own discovery service to discover 'children' maps. 
 * This file has functions to interact with map servers' discovery services. This is in contrast to the global discovery service
 * which is DNS based and is in js/src/core/map-discovery.ts.
 * 
 * TODO: Currently only one level of discovery is done. Implement recursive discovery.
 */

import { MapsDiscovery } from "../core/maps-discovery";
import { MapServer } from "../core/map-server";
import { Geometry } from '../types/geojson';
import axios from "../utils/axiosInstance";

interface MapInfo {
  name: string;
  url: string;
  id?: number | null;
  building_id?: string | null;
  levels?: string[] | null;
}
interface DiscoveryServiceResponse {
  count: number;
  maps: MapInfo[];
}

/**
 * Query the discovery service of individual map servers to discover 'children' maps.
 * It updates the mapDiscoveryObj's mapServers property with the discovered map servers.
 * @param mapsDiscoveryObj The MapsDiscovery object.
 * @param geometry The geometry to discover map servers for.
 * @param mapServersSubset A subset of map servers to query the discovery service for. If empty, all discovered map servers are queried.
 * @returns A promise that resolves to a dictionary of discovered map servers. 
 */
async function queryAllDiscoveryServices(
    mapsDiscoveryObj: MapsDiscovery,
    geometry: Geometry,
    mapServersSubset: { [name: string]: MapServer } | null = null
): Promise<{ [name: string]: MapServer }> {

    let childMapServersDiscovered: { [name: string]: MapServer } = {};

    let mapServersToQuery: { [name: string]: MapServer } = {};
    if (mapServersSubset === null) {
        mapServersToQuery = mapsDiscoveryObj.mapServers;
    } else {
        mapServersToQuery = mapServersSubset;
    }

    // Iterate over all map servers and query their discovery service
    for (const mapServerName in mapServersToQuery) {
        const mapServer = mapServersToQuery[mapServerName];
        const childMapServersDiscoveredThisServer = await queryDiscoveryService(mapServer, geometry);
        // Merge the discovered map servers with the existing ones
        childMapServersDiscovered = { ...childMapServersDiscovered, ...childMapServersDiscoveredThisServer };
    }

    // Update the mapsDiscoveryObj's mapServers property with the discovered map servers
    mapsDiscoveryObj.mapServers = { ...mapsDiscoveryObj.mapServers, ...childMapServersDiscovered };
    
    return childMapServersDiscovered;
}

/**
 * Query the discovery service of a single map server to discover 'children' maps.
 * @param mapServer The MapServer object to query.
 * @param geometry The geometry to discover map servers for.
 * @returns A promise that resolves to a dictionary of discovered map servers. 
 */
async function queryDiscoveryService(
    mapServer: MapServer,
    geometry: Geometry
): Promise<{ [name: string]: MapServer }> {

    let childMapServersDiscovered: { [name: string]: MapServer } = {};
    
    // If capabilities are not known, query them
    if (Object.keys(mapServer.capabilities).length === 0) {
        await mapServer.queryCapabilities();
    }

    const discoveryService = mapServer.getService('discovery');
    if (!discoveryService) {
        // No discovery service
        return {};
    }

    // Form the URL to query the discovery service
    // If the URL is absolute, use it as is. If it is relative, append the map server name to it.
    let url = '';
    if (discoveryService.url.startsWith('http')) {
        url = discoveryService.url;
    } else {
        // If it is a relative URL, append the map server name
        url = `https://${mapServer.name}${discoveryService.url.startsWith('/') ? '' : '/'}${discoveryService.url}`;
    }

    // Send the geometry to the discovery service
    let responseData: DiscoveryServiceResponse | null = null;
    try {
        // Convert geometry to quad string
        if (geometry.type !== 'Polygon') {
            // Currently only Polygon geometries are supported
            return {};
        }

        // Remove the last coordinate from the polygon geometry.
        // This is because the implmentation of the discovery service expects exactly 4 coordinates.
        geometry.coordinates[0].pop(); // Remove the last coordinate.

        const quad = geometry.coordinates[0]
            .map(coord => coord.join(",")) // join lon and lat
            .join(","); // flatten into single string
        const response = await axios.get(url, {
            params: { quad: quad },
            withCredentials: true
        });
        if (response.status !== 200) {
            return {};
        }
        responseData = response.data;
    }
    catch (error) {
        // If there is an error, return empty
        return {};
    }

    if (!responseData || !('maps' in responseData)) {
        return {};
    }

    responseData.maps.forEach(map => {
        // Assuming the map URLs are relative to the map server's base URL
        const childURL = `${mapServer.name}${map.url.startsWith('/') ? '' : '/'}${map.url}`;
        const childMapServer = new MapServer(childURL);
        
        // Populate optional fields
        if(map.id !== undefined) childMapServer.id = map.id;
        if(map.building_id !== undefined) childMapServer.building_id = map.building_id;
        if(map.levels !== undefined && map.levels !== null) childMapServer.levels = map.levels;

        childMapServersDiscovered[childURL] = childMapServer;
    });

    return childMapServersDiscovered;
}

export { queryAllDiscoveryServices, queryDiscoveryService };
