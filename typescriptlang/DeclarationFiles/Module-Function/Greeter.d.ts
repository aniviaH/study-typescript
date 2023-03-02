export = Greeter;
/*~ This example shows how to have multiple overloads for your function */
declare function Greeter(name: string): Greeter.NamedReturnType;
declare function Greeter(length: number): Greeter.LengthReturnType;
/*~ If you want to expose types from your module as well, you can
 *~ place them in this block. Often you will want to describe the
 *~ shape of the return type of the function; that type should
 *~ be declared in here, as this example shows.
 *~
 *~ Note that if you decide to include this namespace, the module can be
 *~ incorrectly imported as a namespace object, unless
 *~ --esModuleInterop is turned on:
 *~   import * as x from '[~THE MODULE~]'; // WRONG! DO NOT DO THIS!
 */
declare namespace Greeter {
  export interface LengthReturnType {
    width: number;
    height: number;
  }
  export interface NamedReturnType {
    firstName: string;
    lastName: string;
  }
  /*~ If the module also has properties, declare them here. For example,
   *~ this declaration says that this code is legal:
   *~   import f = require('super-greeter');
   *~   console.log(f.defaultName);
   */
  export const defaultName: string;
  export let defaultLength: number;
}