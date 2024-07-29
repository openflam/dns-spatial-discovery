import './wasm_exec.js';
import wasmData from './s2-circle-coverer.wasm';

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

async function loadCircleCovererWasm() {
    const go = new Go();
    const result = await WebAssembly.instantiate(
        base64ToArrayBuffer(wasmData), go.importObject);
    go.run(result.instance);
}

export { loadCircleCovererWasm };