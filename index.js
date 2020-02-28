const ALPHABET = "ZAC2B3EF4GH5TK67P8RS9WXY";
const ASIZE = ALPHABET.length

const ENCODE_MAP = function() {
    return ALPHABET.split("").reduce((acc, char) => {
        let [map, idx] = acc;
        map[idx] = char;
        return [map, idx + 1];
    }, [{}, 0])[0];
}();

const DECODE_MAP = function() {
    return ALPHABET.split("").reduce((acc, char) => {
        let [map, idx] = acc;
        map[char] = idx;
        map[char.toLowerCase()] = idx;
        return [map, idx + 1];
    }, [{}, 0])[0];
}();


exports.encode24 = function(data) {
    let len = data.length;

    if (len % 4 != 0) {
        throw "Data length must be a multiple of 4";
    }

    let result = [];

    for (let i = 0; i < len / 4; i++) {
        let j = i * 4;
        let mask = 0xFF;
        let b3 = data[j] & mask;
        let b2 = data[j + 1] & mask;
        let b1 = data[j + 2] & mask;
        let b0 = data[j + 3] & mask;

        let value = ((b3 << 24) | (b2 << 16) | (b1 << 8) | b0) >>> 0;

        let subResult = []
        for (let k = 0; k < 7; k++) {
            let idx = value % ASIZE;
            value = Math.floor(value / ASIZE);

            subResult.unshift(ENCODE_MAP[idx]);
        }
        result = result.concat(subResult);
    }

    return result.join("");
}

exports.decode24 = function(data) {
    let len = data.length;

    if (len % 7 != 0) {
        throw "Data length must be a multiple of 7";
    }

    let bytes = new Uint8Array(len / 7 * 4);

    for (let i = 0; i < len / 7; i++) {
        let j = i * 7;
        let subData = data.substring(j, j + 7);

        let value = 0;

        subData.split("").forEach(s => {
            let idx = DECODE_MAP[s];
            if (idx === undefined) {
                throw "Undefined character in input";
            } else {
                value = ASIZE * value + idx;
            }
        });

        let mask = 0xFF;
        let b0 = (value & (mask << 24)) >>> 24;
        let b1 = (value & (mask << 16)) >>> 16;
        let b2 = (value & (mask << 8)) >>> 8;
        let b3 = (value & mask) >>> 0;

        bytes[i * 4] = b0;
        bytes[i * 4 + 1] = b1;
        bytes[i * 4 + 2] = b2;
        bytes[i * 4 + 3] = b3;
    }

    return bytes;
}


