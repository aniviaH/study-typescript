// Starting with ECMAScript 2015, JavaScript has a concept of modules. TypeScript shares this concept.

// Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. 
// Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

// Modules are declarative; the relationships between modules are specified in terms of imports and exports at the file level.

// Modules import one another using a module loader. 
// At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. 
// Well-known module loaders used in JavaScript are Node.js’s loader for CommonJS modules and the RequireJS loader for AMD modules in Web applications.

// In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. 
// Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).


/** Export */

/** Exporting a declaration */

// Any declaration (such as a variable, function, class, type alias, or interface) can be exported by adding the export keyword.

// StringValidator.ts
// export interface StringValidator {
//   isAcceptable(s: string): boolean;
// }

// ZipCodeValidator.ts
// import { StringValidator } from "./StringValidator";
// export const numberRegexp = /^[0-9]+$/;
// export class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }


/** Export statements */

// Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:

// class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }
// export { ZipCodeValidator };
// export { ZipCodeValidator as mainValidator };


/** Re-exports */

// Often modules extend other modules, and partially expose some of their features. A re-export does not import it locally, or introduce a local variable.

// ParseIntBasedZipCodeValidator.ts
// export class ParseIntBasedZipCodeValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && parseInt(s).toString() === s;
//   }
// }
// Export original validator but rename it
// export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";


// Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.

// export * from "./StringValidator"; // exports 'StringValidator' interface
// export * from "./ZipCodeValidator"; // exports 'ZipCodeValidator' class and 'numberRegexp' constant value
// export * from "./ParseIntBasedZipCodeValidator"; //  exports the 'ParseIntBasedZipCodeValidator' class and re-exports 'RegExpBasedZipCodeValidator' as alias of the 'ZipCodeValidator' class from 'ZipCodeValidator.ts' module.


// import {mainValidator} from './AllValidators'
// new mainValidator()


/** Import */

// Importing is just about as easy as exporting from a module. Importing an exported declaration is done through using one of the import forms below:

/** Import a single export from a module */

// import { ZipCodeValidator } from "./ZipCodeValidator";
// let myValidator = new ZipCodeValidator();

// imports can also be renamed

// import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
// let myValidator = new ZCV();


/** Import the entire module into a single variable, and use it to access the module exports */

// import * as validator from "./ZipCodeValidator";
// let myValidator = new validator.ZipCodeValidator();


/** Import a module for side-effects only */

// Though not recommended practice, some modules set up some global state that can be used by other modules. These modules may not have any exports, or the consumer is not interested in any of their exports. To import these modules, use:

// import "./my-module.js";


/** Importing Types */

// Prior to TypeScript 3.8, you can import a type using import.
// With TypeScript 3.8, you can import a type using the import statement, or using import type.

// Re-using the same import
// import { APIResponseType } from "./api";

// Explicitly use import type
// import type { a, TypeA } from "./api";
// console.log(a) // 'a' cannot be used as a value because it was imported using 'import type'.

// Explicitly pull out a value (a) and a type (A)
import { type TypeA, a} from "./api";

// Any explicitly marked type import is guaranteed to be removed from your JavaScript, and tools like Babel can make better assumptions about your code via the <isolatedModules> compiler flag. You can read more in the <3.8 release notes>.



/** Default exports */

// Each module can optionally export a default export. 
// Default exports are marked with the keyword default; 
// and there can only be one default export per module. 
// default exports are imported using a different import form.

// default exports are really handy. For instance, a library like jQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.

// JQuery.d.ts
// declare let $: JQuery;
// export default $;

// import $ from "./JQuery";
// $("button.continue").html("Next Step...");

// Classes and function declarations can be authored directly as default exports. Default export class and function declaration names are optional.

// ZipCodeValidator.ts
// export default class ZipCodeValidator {
//   static numberRegexp = /^[0-9]+$/;
//   isAcceptable(s: string) {
//     return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
//   }
// }
// import validator from "./ZipCodeValidator";
// let myValidator = new validator();

// or

// StaticZipCodeValidator.ts
// const numberRegexp = /^[0-9]+$/;
// export default function (s: string) {
//   return s.length === 5 && numberRegexp.test(s);
// }
// Test.ts
// import validate from "./StaticZipCodeValidator";
// let strings = ["Hello", "98052", "101"];
// // Use function validate
// strings.forEach((s) => {
//   console.log(`"${s}" ${validate(s) ? "matches" : "does not match"}`);
// });

// default exports can also be just values:

// OneTwoThree.ts
// export default "123";

// Log.ts
// import num from "./OneTwoThree";
// console.log(num); // "123"


/** Export all as x */

// With TypeScript 3.8, you can use export * as ns as a shorthand for re-exporting another module with a name:

// utilitiesIndex.ts
// export * as utilities from "./utilities";

// This takes all of the dependencies from a module and makes it an exported field, you could import it like this:

// import {utilities} from './utilitiesIndex'



/** export = and import = require() */

// Both CommonJS and AMD generally have the concept of an exports object which contains all exports from a module.

// They also support replacing the exports object with a custom single object. Default exports are meant to act as a replacement for this behavior; 
// however, the two are incompatible. 
// TypeScript supports export = to model the traditional CommonJS and AMD workflow.

// The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.

// When exporting a module using export =, TypeScript-specific import module = require("module") must be used to import the module.

// import zip = require("./Export=");
// // Some samples to try
// let strings = ["Hello", "98052", "101"];
// // Validators to use
// let validator = new zip();
// // Show whether each string passed each validator
// strings.forEach((s) => {
//   console.log(
//     `"${s}" - ${validator.isAcceptable(s) ? "matches" : "does not match"}`
//   );
// });


/** Code Generation for Modules */

// Depending on the module target specified during compilation, the compiler will generate appropriate code for Node.js (CommonJS), require.js (AMD), UMD, SystemJS, or ECMAScript 2015 native modules (ES6) module-loading systems. 
// For more information on what the define, require and register calls in the generated code do, consult the documentation for each module loader.

// This simple example shows how the names used during importing and exporting get translated into the module loading code.

// SimpleModule.ts
// import m = require("mod");
// export let t = m.something + 1;

// AMD / RequireJS SimpleModule.js
// define(["require", "exports", "./mod"], function (require, exports, mod_1) {
//   exports.t = mod_1.something + 1;
// });

// CommonJS / Node SimpleModule.js
// var mod_1 = require("./mod");
// exports.t = mod_1.something + 1;

// UMD SimpleModule.js
// (function (factory) {
//   if (typeof module === "object" && typeof module.exports === "object") {
//     var v = factory(require, exports);
//     if (v !== undefined) module.exports = v;
//   } else if (typeof define === "function" && define.amd) {
//     define(["require", "exports", "./mod"], factory);
//   }
// })(function (require, exports) {
//   var mod_1 = require("./mod");
//   exports.t = mod_1.something + 1;
// });

// System SimpleModule.js
// System.register(["./mod"], function (exports_1) {
//   var mod_1;
//   var t;
//   return {
//     setters: [
//       function (mod_1_1) {
//         mod_1 = mod_1_1;
//       },
//     ],
//     execute: function () {
//       exports_1("t", (t = mod_1.something + 1));
//     },
//   };
// });

// Native ECMAScript 2015 modules SimpleModule.js
// import { something } from "./mod";
// export var t = something + 1;

/** Simple Example */

// Below, we’ve consolidated the Validator implementations used in previous examples to only export a single named export from each module.

// To compile, we must specify a module target on the command line. 
// For Node.js, use --module commonjs; 
// for require.js, use --module amd. For example:

// tsc --module commonjs Test.ts


/** Optional Module Loading and Other Advanced Loading Scenarios */

// In some cases, you may want to only load a module under some conditions. 
// In TypeScript, we can use the pattern shown below to implement this and other advanced loading scenarios to directly invoke the module loaders without losing type safety.

// The compiler detects whether each module is used in the emitted JavaScript. 
// If a module identifier is only ever used as part of a type annotations and never as an expression, then no require call is emitted for that module. 
// This elision of unused references is a good performance optimization, and also allows for optional loading of those modules.

// The core idea of the pattern is that the import id = require("...") statement gives us access to the types exposed by the module. 
// The module loader is invoked (through require) dynamically, as shown in the if blocks below. 
// This leverages the reference-elision optimization so that the module is only loaded when needed. 
// For this pattern to work, it’s important that the symbol defined via an import is only used in type positions (i.e. never in a position that would be emitted into the JavaScript).

// To maintain type safety, we can use the typeof keyword. 
// The typeof keyword, when used in a type position, produces the type of a value, in this case the type of the module.

// Dynamic Module Loading in Node.js
// declare function require(moduleName: string): any;
// import { ZipCodeValidator as Zip } from "./ZipCodeValidator";
// if (needZipValidation) {
//   let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
//   let validator = new ZipCodeValidator();
//   if (validator.isAcceptable("...")) {
//     /* ... */
//   }
// }

// Sample: Dynamic Module Loading in require.js
// declare function require(
//   moduleNames: string[],
//   onLoad: (...args: any[]) => void
// ): void;
// import * as Zip from "./ZipCodeValidator";
// if (needZipValidation) {
//   require(["./ZipCodeValidator"], (ZipCodeValidator: typeof Zip) => {
//     let validator = new ZipCodeValidator.ZipCodeValidator();
//     if (validator.isAcceptable("...")) {
//       /* ... */
//     }
//   });
// }

// Sample: Dynamic Module Loading in System.js
// declare const System: any;
// import { ZipCodeValidator as Zip } from "./ZipCodeValidator";
// if (needZipValidation) {
//   System.import("./ZipCodeValidator").then((ZipCodeValidator: typeof Zip) => {
//     var x = new ZipCodeValidator();
//     if (x.isAcceptable("...")) {
//       /* ... */
//     }
//   });
// }


/** Working with Other JavaScript Libraries */

// To describe the shape of libraries not written in TypeScript, we need to declare the API that the library exposes.

// We call declarations that don’t define an implementation “ambient”. Typically, these are defined in .d.ts files. 
// If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.

/** Ambient Modules */

// In Node.js, most tasks are accomplished by loading one or more modules. 
// We could define each module in its own .d.ts file with top-level export declarations, but it’s more convenient to write them as one larger .d.ts file. 
// To do so, we use a construct similar to ambient namespaces, but we use the module keyword and the quoted name of the module which will be available to a later import. For example:

// node.d.ts (simplified excerpt)
// declare module "url" {
//   export interface Url {
//     protocol?: string;
//     hostname?: string;
//     pathname?: string;
//   }
//   export function parse(
//     urlStr: string,
//     parseQueryString?,
//     slashesDenoteHost?
//   ): Url;
// }
// declare module "path" {
//   export function normalize(p: string): string;
//   export function join(...paths: any[]): string;
//   export var sep: string;
// }

// Now we can /// <reference> node.d.ts and then load the modules using import url = require("url"); or import * as URL from "url".

// /// <reference path="./AmbientModules/mynode.d.ts" />
// import * as MYURL from 'myurl'
// let myUrl = MYURL.parse('https://www.typescriptlang.org')


/** Shorthand ambient modules */

// If you don’t want to take the time to write out declarations before using a new module, you can use a shorthand declaration to get started quickly.

// declarations.d.ts
// declare module "hot-new-module";

// All imports from a shorthand module will have the any type.

// import x, { y } from "hot-new-module";
// x(y);


/** Wildcard module declarations */

// Some module loaders such as SystemJS and AMD allow non-JavaScript content to be imported. 
// These typically use a prefix or suffix to indicate the special loading semantics. 
// Wildcard module declarations can be used to cover these cases.

// declare module "*!text" {
//   const content: string;
//   export default content;
// }
// Some do it the other way around.
// declare module "json!*" {
//   const value: any;
//   export default value;
// }

// Now you can import things that match "*!text" or "json!*".

// import fileContent from "./xyz.txt!text";
// import data from "json!http://example.com/data.json";
// console.log(data, fileContent);


/** UMD modules */

// Some libraries are designed to be used in many module loaders, or with no module loading (global variables). 
// These are known as UMD modules. These libraries can be accessed through either an import or a global variable. For example:

// math-lib.d.ts
// export function isPrime(x: number): boolean;
// export as namespace mathLib;

// The library can then be used as an import within modules:

// import { isPrime } from "math-lib";
// isPrime(2);
// mathLib.isPrime(2); // ERROR: can't use the global definition from inside a module

// It can also be used as a global variable, but only inside of a script. (A script is a file with no imports or exports.)

// mathLib.isPrime(2);