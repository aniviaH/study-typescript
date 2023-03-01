"use strict";
exports.__esModule = true;
var ZipCodeValidator_1 = require("./ZipCodeValidator");
var needZipValidation = false;
if (needZipValidation) {
    var ZipCodeValidator = require("./ZipCodeValidator");
    // let validator = new ZipCodeValidator(); // 编译之后可以省略顶部的ZipCodeValidator的导入
    var validator = new ZipCodeValidator_1.ZipCodeValidator(); // 编译之后顶部的ZipCodeValidator的导入正常
    if (validator.isAcceptable("...")) {
        /* ... */
    }
}
