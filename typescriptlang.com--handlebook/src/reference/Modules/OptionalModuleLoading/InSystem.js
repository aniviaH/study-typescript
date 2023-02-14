"use strict";
exports.__esModule = true;
var ZipCodeValidator_1 = require("./ZipCodeValidator");
var needZipValidation = false;
if (needZipValidation) {
    System["import"]("./ZipCodeValidator").then(function (ZipCodeValidator) {
        // var x = new ZipCodeValidator();
        var x = new ZipCodeValidator_1.ZipCodeValidator();
        if (x.isAcceptable("...")) {
            /* ... */
        }
    });
}
