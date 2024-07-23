import MockAdapter from 'axios-mock-adapter';
import { mockLocalizationServer } from './mock-adapters/localization-server';

var mock = new MockAdapter(dnsspatialdiscovery.axios);

mockLocalizationServer(mock);

export { mock };
