import { loadCircleCovererWasm } from "./wasm/load-wasm";
import { consoleLog } from "./log";

/*
 * S2 hex token -> domain digits
 */
async function tokenToDomainDigits(s2Token: string): Promise<string[]> {
    if (typeof s2TokenToBinaryIDGo === 'undefined') {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }
    let binaryID = s2TokenToBinaryIDGo(s2Token) // go function
    let domainDigits = binaryIDToDomainDigits(binaryID);
    return domainDigits;
}

/**
 * S2 hex tokens to domain digits
 * @param {string[]} s2Tokens S2 hex tokens
 * @returns {Promise<string[][]>} Domain digits for each S2 token
 */
async function tokensToDomainDigits(s2Tokens: string[]): Promise<string[][]> {
    if (typeof s2TokenToBinaryIDGo === 'undefined') {
        consoleLog("Loading WASM", "debug");
        await loadCircleCovererWasm();
    }
    let domainDigitsPromises = s2Tokens.map(token => tokenToDomainDigits(token));
    let domainDigits = await Promise.all(domainDigitsPromises);
    return domainDigits;
}

/*
 * S2 binary ID -> Domain digits
 */
function binaryIDToDomainDigits(binaryID: string): string[] {
    // Format of S2 Cell ID from http://s2geometry.io/devguide/s2cell_hierarchy.html
    // s = [face] [child]^k 1 0^(60-2k)
    // [face] - 3 bits. [child] - 2 bits each.

    // Pad with 0s to make it 64 bits
    binaryID = binaryID.padStart(64, '0');

    // Remove trailing 0s and 1
    binaryID = binaryID.slice(0, binaryID.lastIndexOf('1'));

    // Face is the first 3 bits
    let face = parseInt(binaryID.slice(0, 3), 2).toString();
    let domainDigits = [face];

    // The hierarchy is the rest of the bits
    let hierarchy = parseInt(binaryID.slice(3), 2).toString(4);
    let expectedLength = (binaryID.length - 3) / 2; // 3 face bits. 2 bits per level.
    hierarchy = hierarchy.padStart(expectedLength, '0');
    let hierarchySplit = hierarchy.split('');

    domainDigits = domainDigits.concat(hierarchySplit);
    domainDigits.reverse();
    return domainDigits;
}

export { tokenToDomainDigits, tokensToDomainDigits };