# S2 Circle coverer in Go

This directory contains functions in Go to get a region cover of S2 cells for a circle of given center and radius. This Go module is compiled to WASM (WebAssembly) so it can be used in the browser environment. The compiled binary is output to `../src/utils/wasm/s2-circle-coverer.wasm`.

The reason a go implementation is used is because the pure js implementation of s2 ([s2-geometry](https://www.npmjs.com/package/s2-geometry)) does not implement the region coverer algorithm.

## Compilation

Install *go* and *tinygo* to compile this code to wasm.

`tinygo` is used to compile the go code to WASM instead of the default go compiler as it reduces the size of the output to 30\%.
To compile to wasm, run the following command in this directory:
```
tinygo build -o ../src/utils/wasm/s2-circle-coverer.wasm -target wasm ./main.go
```

The file `wasm_exec.js` is already included in the `/js/src/utils/wasm/wasm_exec.js` directory. It was copied and **modified** from `TINYGOROOT` using `cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js ../src/utils/wasm/wasm_exec.js`.

The following modifications were required: 
- Remove all require statements such as `require('util')`, `require('crypto')`. These modules are available as Web APIs on browsers and are avaialable in the `globalThis` namespace.

## Testing

Run tests by running `cd s2_circle_coverer && go test`.