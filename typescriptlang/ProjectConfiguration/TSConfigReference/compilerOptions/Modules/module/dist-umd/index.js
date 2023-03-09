(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var constants_1 = require("./constants");
    var twoPi = constants_1.valueOfPi * 2;
    console.log('twoPi = ', twoPi);
});
