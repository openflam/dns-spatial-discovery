import MockAdapter from "axios-mock-adapter";
type Pose = number[][];
interface LocalizationResponse {
    pose: Pose;
    confidence?: number;
    [key: string]: any;
}
declare function mockLocalizationServer(mockAdapter: MockAdapter): void;
export { mockLocalizationServer, LocalizationResponse };
