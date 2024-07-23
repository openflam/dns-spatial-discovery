import { AxiosInstance } from "axios";

declare global {
    namespace dnsspatialdiscovery {
        var axios: AxiosInstance;
    }
}
