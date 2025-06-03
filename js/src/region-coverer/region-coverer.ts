import { loadCircleCovererWasm } from "../utils/wasm/load-wasm";
import { consoleLog } from "../utils/log";

async function s2CircleCoverer(latLng: LatLng, radius: number): Promise<string[]> {
    if (typeof s2CircleCovererGo === "undefined") {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }
    return s2CircleCovererGo(
        latLng,
        radius,
        1, // Min level
        23, // Max level (avg. area: 1.21 m^2)
        10, // Max cells
    );
}

async function s2PolygonCoverer(polygon: LatLng[]): Promise<string[]> {
    if (typeof s2PolygonCovererGo === "undefined") {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }
    return s2PolygonCovererGo(
        polygon,
        1, // Min level
        23, // Max level (avg. area: 1.21 m^2)
        10, // Max cells
    );
}

export { s2CircleCoverer, s2PolygonCoverer };