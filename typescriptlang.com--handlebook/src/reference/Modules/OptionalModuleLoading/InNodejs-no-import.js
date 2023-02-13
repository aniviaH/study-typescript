"use strict";
exports.__esModule = true;
var needZipValidation = false;
if (needZipValidation) {
    var ZipCodeValidator = require("./ZipCodeValidator");
    var validator = new ZipCodeValidator(); // 编译之后可以省略顶部的ZipCodeValidator的导入
    // let validator = new Zip(); // 编译之后顶部的ZipCodeValidator的导入正常
    if (validator.isAcceptable("...")) {
        /* ... */
    }
}
