import { StringValidator } from "./StringValidator";

export const numberRegexp = /^[0-9]+$/;

// export class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }

// Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

export const a = 1