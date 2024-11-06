# Javascript DNS spatial discovery

## Installation
The npm package is hosted within the `openflam` scope on Github npm registry.

```sh
npm login --scope=@openflam --registry=https://npm.pkg.github.com
<Login with your PERSONAL username and password>
npm install @openflam/dnsspatialdiscovery@1.0.2
```

## Usage

### Discovery
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

### No discovery

You might want to skip disocvery phase if you already know which map server to use. In that case:

```js
let mapServer = new dnsspatialdiscovery.MapServer("map-server.com");
let emptyBlob = new Blob([image]);
let poseData = await mapServer.localize(emptyBlob, "image");
```

### Events

Following events are raised by `dnsspatialdiscovery.Events` object:
- "mapfound:good": A map with an error lower than the cofigured bound is found.
- "mapfound:poor": A map is found, but even the best of the discovered maps in the area has a high error.
- "nomap": No map found.

Functions can be attached to events as:
```javascript
dnsspatialdiscovery.Events.on('mapfound:good', () => {
    // Make location marker green
});
dnsspatialdiscovery.Events.on('mapfound:poor', () => {
    // Make location marker yellow
});
```

## Development

Set up npm, and Node.js using nvm using instruction [here](https://nodejs.org/en/download/package-manager). 

To install dependencies: `npm install` and to build `npm run build`.

## Testing

Run tests using: `npm run test`. It'll start a server at http://localhost:9000. Navigate to `/test/test.html` to view the rest results.
