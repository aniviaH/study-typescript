"use strict";
exports.__esModule = true;
var Zip = require("./ZipCodeValidator");
var needZipValidation = false;
if (needZipValidation) {
    require(["./../ZipCodeValidator"], function (ZipCodeValidator) {
        // let validator = new ZipCodeValidator.ZipCodeValidator(); // 编译之后可以省略顶部的ZipCodeValidator的导入
        var validator = new Zip.ZipCodeValidator(); // 编译之后顶部的ZipCodeValidator的导入正常
        if (validator.isAcceptable("...")) {
            /* ... */
        }
    });
}
