"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateObjectArray = exports.assert = void 0;
function assert(val, msg) {
    if (!msg)
        msg = "Error: " + val + " is not true";
    if (!val)
        throw new Error(msg);
}
exports.assert = assert;
function generateObjectArray(arr1, key1, arr2, key2) {
    assert(arr1.length === arr2.length, "Arrays must be the same length");
    assert(key1 !== key2, "Keys must be different");
    let arr3 = [];
    for (let i = 0; i < arr1.length; i++) {
        arr3.push({
            [key1]: arr1[i],
            [key2]: arr2[i]
        });
    }
    return arr3;
}
exports.generateObjectArray = generateObjectArray;
