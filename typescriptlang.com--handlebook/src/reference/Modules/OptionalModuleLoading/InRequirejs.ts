declare function require(
  moduleNames: string[],
  onLoad: (...args: any[]) => void
): void;

import * as Zip from "./ZipCodeValidator";

const needZipValidation = false
if (needZipValidation) {
  require(["./../ZipCodeValidator"], (ZipCodeValidator: typeof Zip) => {
    // let validator = new ZipCodeValidator.ZipCodeValidator(); // 编译之后可以省略顶部的ZipCodeValidator的导入
    let validator = new Zip.ZipCodeValidator(); // 编译之后顶部的ZipCodeValidator的导入正常
    if (validator.isAcceptable("...")) {
      /* ... */
    }
  });
}