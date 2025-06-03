// From webpack config
declare const LOGGER_LEVEL: 'debug' | 'error';

// From circle-coverer/wasm_exec.js
declare const Go: any;

// From WASM
declare const s2CircleCovererGo: (
    latlng: { lat: number, lng: number },
    radius: number,
    minLevel: number,
    maxLevel: number,
    maxCells: number) => Promise<string[]>;
declare const s2PolygonCovererGo: (
    polygon: { lat: number, lng: number }[],
    minLevel: number,
    maxLevel: number,
    maxCells: number) => Promise<string[]>;
declare const s2BinaryIDToTokenGo: (binaryID: string) => string;
declare const s2TokenToBinaryIDGo: (s2Token: string) => string;
