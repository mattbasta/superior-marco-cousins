
function b64ToUint6(char) {
    return char > 64 && char < 91 ?
            char - 65
        : char > 96 && char < 123 ?
            char - 71
        : char > 47 && char < 58 ?
            char + 4
        : char === 43 ?
            62
        : char === 47 ?
            63
        :
            0;
}

export function base64DecToArr(sBase64) {
    const sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, '');
    const nInLen = sB64Enc.length;
    const nOutLen = nInLen * 3 + 1 >> 2;
    const taBytes = new Uint8Array(nOutLen);

    let nUint24 = 0;
    let nOutIdx = 0;
    for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        const nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.codePointAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (let nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >> (16 >> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }

    return taBytes;
};
