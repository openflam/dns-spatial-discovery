# Javascript DNS spatial discovery

## Usage

### Installation
The npm package is hosted within the `openvps` scope on Github npm registry.

```sh
npm login --scope=@openvps --registry=https://npm.pkg.github.com
<Login with your PERSONAL username and password>
npm install @openvps/dnsspatialdiscovery@1.0.2
```

And then the library can be use in javascript as:
```javascript
const suffix = "loc." // Suffix to the discovered geodomains
const rootNameserver = "https://loc-nameserver.net";
const discoveryObj = new dnsspatialdiscovery.MapsDiscovery(suffix, rootNameserver);

let localizationType = "image";
// Get lat, lon, error_m, vioPose, dataBlob
var localizationResult = discoveryObj.localize(
    lat, lon, error_m,
    dataBlob, localizationType, vioPose);
```

The `localize` function:
- Disocvers map servers if they have not been discovered yet.
- Uses the currently "active server" -- The server that has been giving good localization result to localize.
- If the active server gives results with a high error, tries to relocalize within the list of discovered servers.
- If best localization result provided all the discovered is high, rediscovered servers and relocalizes.
- If no servers are discovered, returns null.

## Development

Set up npm, and Node.js using nvm using instruction [here](https://nodejs.org/en/download/package-manager). 

To install dependencies: `npm install` and to build `npm run build`.

## Testing

Run tests using: `npm run test`. It'll start a server at http://localhost:9000. Navigate to `/test/test.html` to view the rest results.
