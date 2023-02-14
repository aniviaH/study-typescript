declare const System: any;
import { ZipCodeValidator as Zip } from "./ZipCodeValidator";
const needZipValidation = false
if (needZipValidation) {
  System.import("./ZipCodeValidator").then((ZipCodeValidator: typeof Zip) => {
    // var x = new ZipCodeValidator();
    var x = new Zip()
    if (x.isAcceptable("...")) {
      /* ... */
    }
  });
}