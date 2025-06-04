import { loadCircleCovererWasm } from "../utils/wasm/load-wasm";
import { consoleLog } from "../utils/log";

type CoveringOptions = {
    minLevel?: number;
    maxLevel?: number;
    maxCells?: number;
    interior?: boolean;
}

async function s2CircleCoverer(latLng: { lat: number, lng: number }, radius: number, coveringOptions: CoveringOptions = {}): Promise<string[]> {
    if (typeof s2CircleCovererGo === "undefined") {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }

    const { minLevel = 1, maxLevel = 23, maxCells = 10 } = coveringOptions;
    let s2Cells: string[];

    // If the interior option is provided, use it.
    if (coveringOptions.interior !== undefined) {
        s2Cells = s2CircleCovererGo(
            latLng,
            radius,
            minLevel,
            maxLevel,
            maxCells,
            coveringOptions.interior
        );
    }

    // If the interior option is not provided, first try true. If it does not return any cells, try false.
    else {
        s2Cells = s2CircleCovererGo(
            latLng,
            radius,
            minLevel,
            maxLevel,
            maxCells,
            true,
        );
        if (s2Cells.length === 0) {
            s2Cells = s2CircleCovererGo(
                latLng,
                radius,
                minLevel,
                maxLevel,
                maxCells,
                false,
            );
        }
    }
    return s2Cells;
}

async function s2PolygonCoverer(polygon: { lat: number, lng: number }[], coveringOptions: CoveringOptions = {}): Promise<string[]> {
    if (typeof s2PolygonCovererGo === "undefined") {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }

    const { minLevel = 1, maxLevel = 23, maxCells = 10 } = coveringOptions;
    let s2Cells: string[];

    // If the interior option is provided, use it.
    if (coveringOptions.interior !== undefined) {
        s2Cells = s2PolygonCovererGo(
            polygon,
            minLevel,
            maxLevel,
            maxCells,
            coveringOptions.interior
        );
    }

    // If the interior option is not provided, first try true. If it does not return any cells, try false.
    else {
        s2Cells = s2PolygonCovererGo(
            polygon,
            minLevel,
            maxLevel,
            maxCells,
            true,
        );
        if (s2Cells.length === 0) {
            s2Cells = s2PolygonCovererGo(
                polygon,
                minLevel,
                maxLevel,
                maxCells,
                false,
            );
        }
    }
    return s2Cells;
}

export { s2CircleCoverer, s2PolygonCoverer };
export type { CoveringOptions };
