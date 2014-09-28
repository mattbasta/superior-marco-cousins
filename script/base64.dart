import 'dart:typed_data';


int _b64ToUint6(int char) {
    return char > 64 && char < 91 ?
            char - 65
        : char > 96 && char < 123 ?
            char - 71
        : char > 47 && char < 58 ?
            char + 4
        : char == 43 ?
            62
        : char == 47 ?
            63
        :
            0;
}

var baseRegexp = new RegExp(r'/[^A-Za-z0-9\+\/]/g');

Uint8List base64DecToArr(String sBase64, int nBlocksSize) {
    var sB64Enc = sBase64.replaceAll(baseRegexp, '');
    var nInLen = sB64Enc.length;
    var nOutLen = nBlocksSize != 0 ? ((nInLen * 3 + 1 >> 2) / nBlocksSize).ceil() * nBlocksSize : nInLen * 3 + 1 >> 2;
    var taBytes = new Uint8List(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= _b64ToUint6(sB64Enc.codeUnitAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 == 3 || nInLen - nInIdx == 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >> (16 >> nMod3 & 24) & 255;
            }
            nUint24 = 0;

        }
    }

    return taBytes;
}
