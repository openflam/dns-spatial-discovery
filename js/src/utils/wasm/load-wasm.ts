import './wasm_exec.js';
import wasmData from './s2-circle-coverer.wasm';

async function loadCircleCovererWasm() {
    const go = new Go();
    const result = await WebAssembly.instantiateStreaming(
        fetch(wasmData), go.importObject);
    go.run(result.instance);
}

export { loadCircleCovererWasm };