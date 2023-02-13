"use strict";
exports.__esModule = true;
var needZipValidation = false;
if (needZipValidation) {
    require(["./../ZipCodeValidator"], function (ZipCodeValidator) {
        var validator = new ZipCodeValidator.ZipCodeValidator();
        // let validator = new Zip.ZipCodeValidator();
        if (validator.isAcceptable("...")) {
            /* ... */
        }
    });
}
