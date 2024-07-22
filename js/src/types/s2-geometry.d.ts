declare module 's2-geometry' {
    export const S2: {
        latLngToKey(lat: number, lng: number, level: number): string;
    };
}