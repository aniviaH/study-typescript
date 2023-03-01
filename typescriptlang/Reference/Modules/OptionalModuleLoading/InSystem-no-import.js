"use strict";
exports.__esModule = true;
var needZipValidation = false;
if (needZipValidation) {
    System["import"]("./ZipCodeValidator").then(function (ZipCodeValidator) {
        var x = new ZipCodeValidator();
        if (x.isAcceptable("...")) {
            /* ... */
        }
    });
}
