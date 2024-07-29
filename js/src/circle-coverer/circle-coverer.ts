import { loadCircleCovererWasm } from "./load-wasm";
import { consoleLog } from "../utils/log";

async function s2CircleCoverer(lat: number, lng: number, radius: number) {
    if (typeof s2CircleCovererGo === "undefined") {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }
    return s2CircleCovererGo(
        { lat: lat, lng: lng },
        radius,
        1, // Min level
        23, // Max level (avg. area: 1.21 m^2)
        10, // Max cells
    );
}

export { s2CircleCoverer };