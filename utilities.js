"use strict";
exports.__esModule = true;
exports.assert = void 0;
function assert(val, msg) {
    if (!msg)
        msg = "Error: " + val + " is not true";
    if (!val)
        throw new Error(msg);
}
exports.assert = assert;
