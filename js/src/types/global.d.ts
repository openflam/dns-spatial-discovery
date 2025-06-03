// From webpack config
declare const LOGGER_LEVEL: 'debug' | 'error';

// From circle-coverer/wasm_exec.js
declare const Go: any;

// LatLng type
type LatLng = {
    lat: number;
    lng: number;
};

// From WASM
declare const s2CircleCovererGo: (
    latlng: LatLng,
    radius: number,
    minLevel: number,
    maxLevel: number,
    maxCells: number) => Promise<string[]>;
declare const s2PolygonCovererGo: (
    polygon: LatLng[],
    minLevel: number,
    maxLevel: number,
    maxCells: number) => Promise<string[]>;
declare const s2BinaryIDToTokenGo: any;
declare const s2TokenToBinaryIDGo: any;
