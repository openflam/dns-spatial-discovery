# Javascript DNS spatial discovery

## Usage
Include the bundled `./dist/main.js` as a script:
```html
<script src="./dist/main.js"></script>
```

And then the library can be use in javascript as:
```javascript
const discoveryObj = new dnsspatialdiscovery.MapsDiscovery();
const servers = await discoveryObj.discoverMapServers(lat=44.4, lon=-79.6, error_m=5);

// Expected output is the list of MapServer objects. Each MapServer object has all the data
// and metadata associated with the map servers discovered.

## Development

Set up npm, and Node.js using nvm using instruction [here](https://nodejs.org/en/download/package-manager). 

To install dependencies: `npm install` and to build `npm run build`.

## Testing

Run tests using: `npm run test`. It'll start a server at [http://localhost:9000]. Navigate to `/test/test.html` to view the rest results.
