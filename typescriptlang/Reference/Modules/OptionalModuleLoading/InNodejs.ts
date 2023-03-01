declare function require(moduleName: string): any;
import { ZipCodeValidator as Zip } from "./ZipCodeValidator";
const needZipValidation = false
if (needZipValidation) {
  let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
  // let validator = new ZipCodeValidator(); // 编译之后可以省略顶部的ZipCodeValidator的导入
  let validator = new Zip(); // 编译之后顶部的ZipCodeValidator的导入正常
  if (validator.isAcceptable("...")) {
    /* ... */
  }
}