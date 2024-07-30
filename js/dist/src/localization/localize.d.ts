import { LocalizationData, MapServer } from "./map-server";
import { LocalizationResponse } from "./map-server";
declare function queryLocalize(mapServer: MapServer, dataBlob: Blob, localizationType: string): Promise<LocalizationResponse>;
declare function errorWithVIO(mapServer: MapServer, localizationData: LocalizationData): number;
export { queryLocalize, errorWithVIO };
