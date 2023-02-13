"use strict";
exports.__esModule = true;
exports.a = exports.mainValidator = exports.ZipCodeValidator = exports.numberRegexp = void 0;
exports.numberRegexp = /^[0-9]+$/;
// Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
exports.mainValidator = ZipCodeValidator;
exports.a = 1;
