import { GeoJsonObject } from 'geojson';
import { Geometry as OriginalGeometry } from 'geojson';
import { Position } from 'geojson';

interface Circle extends Omit<GeoJsonObject, 'type'> {
    type: "Circle";
    coordinates: Position;
    radius: number; // Radius in meters
}

export type Geometry = OriginalGeometry | Circle;