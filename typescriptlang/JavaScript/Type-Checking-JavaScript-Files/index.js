// @ts-check

export {}

/* 
class C {
  constructor() {
    this.constructorOnly = 0
    this.constructorUnknown = undefined;
  }
  method() {
    // this.constructorOnly = false; // Type 'boolean' is not assignable to type 'number'.
    this.constructorUnknown = "plunkbat"; // ok, constructorUnknown is string | undefined
    this.methodOnly = "ok"; // ok, but methodOnly could also be undefined
  }
  method2() {
    this.methodOnly = true; // also, ok, methodOnly's type is string | boolean | undefined
  }
}
 */

// class C {
//   constructor() {
//     /** @type {number | undefined} */
//     this.prop = undefined;
//     /** @type {number | undefined} */
//     this.count;
//   }
// }
 
// let c = new C();
// c.prop = 0; // OK
// // c.count = "string"; // Type 'string' is not assignable to type 'number'.
/* 
function C() {
  this.constructorOnly = 0;
  this.constructorUnknown = undefined;
}
C.prototype.method = function () {
  // this.constructorOnly = false; // Type 'boolean' is not assignable to type 'number'.
  this.constructorUnknown = "plunkbat"; // OK, the type is string | undefined
};
 */

// // same as `import module "fs"`
// const fs = require("fs");
// // same as `export function readFile`
// /**
//  * 
//  * @param {string | number} f 
//  * @returns 
//  */
// module.exports.readFile = function (f) {
//   return fs.readFileSync(f);
// };

/* 
class C {}
C.D = class {};
 */
/* 
function Outer() {
  this.y = 2;
}
 
Outer.Inner = function () {
  this.yy = 2;
};
 
Outer.Inner();
 */

/* 
var ns = {};
ns.C = class {};
ns.func = function () {};
 
ns;
 */

/* 
// IIFE
var ns = (function (n) {
  return n || {};
})();
// ns.CONST = 1; // Property 'CONST' does not exist on type '{}'.
 */
/* 
// defaulting to global
var assign
assign = assign || function () {
  // code goes here
};
// assign.extra = 1; // Property 'extra' does not exist on type '() => void'.
 */


// /**
//  * @type {{a: number}}
//  */
// var obj = { a: 1};
// // obj.b = 2; // Property 'b' does not exist on type '{ a: number; }'.

/* 
var sss = undefined
var sssArr = []
 */

// function Foo(i = null) {
//   if (!i) this.i = 1;
//   var j = undefined;
//   j = 2;
//   /**
//    * @type any[]
//    */
//   this.l = [];
// }
 
// var foo = new Foo();
// foo.l.push(foo.i);
// foo.l.push("end");

// // @ts-ignore
// function bar(a, b) {
//   console.log(a + " " + b);
// }
 
// bar(1); // OK, second argument considered optional
// bar(1, 2);
// // bar(1, 2, 3); // Error, too many arguments

// /**
//  * @param {string} [somebody] - Somebody's name.
//  */
// function sayHello(somebody) {
//   if (!somebody) {
//     somebody = "John Doe";
//   }
//   console.log("Hello " + somebody);
// }
// sayHello('1');


// /** @param {...number} args */
// function sum(/* numbers */) {
//   var total = 0;
//   for (var i = 0; i < arguments.length; i++) {
//     total += arguments[i];
//   }
//   return total;
// }

// sum(1, 2)

// import { Component } from "react";
// class MyComponent extends Component {
//   // @ts-ignore
//   render() {
//     this.props.b; // Allowed, since this.props is of type any
//   }
// }

// /**
//  * @augments {Component<{a: number}, {}>}
//  */
// class MyComponent2 extends Component {
//   // @ts-ignore
//   render() {
//     // this.props.b; // Error: b does not exist on {a:number}
//   }
// }


// /** @type {any[]} */
// var x = []
// x.push('a')
// x.push(1)

// /** @type {Array<number>} */
// var y = []
// // y.push('a') // Argument of type 'string' is not assignable to parameter of type 'number'.
// y.push(1)

/** promise p !!!  */
var p = new Promise((resolve, reject) => {
  reject();
});
p; // Promise<any>
