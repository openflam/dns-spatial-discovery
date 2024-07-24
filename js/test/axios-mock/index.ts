import MockAdapter from 'axios-mock-adapter';
import { mockLocalizationServer } from './mock-adapters/localization-server';
import { mockDNSServer } from './mock-adapters/dns-server';

// Mock the axios instance with a delay of 10ms
var mock = new MockAdapter(dnsspatialdiscovery.axios, { delayResponse: 10 });

mockLocalizationServer(mock);
mockDNSServer(mock);

export { mock };
