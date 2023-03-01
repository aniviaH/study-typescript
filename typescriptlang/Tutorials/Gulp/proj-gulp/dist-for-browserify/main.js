"use strict";
// function hello (compiler: string) {
//   console.log(`Hello from ${compiler}`);
// }
// hello("TypeScript");
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
// console.log(sayHello('TypeScript'));
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerHTML = (0, greet_1.sayHello)(name);
}
showHello('greeting', 'TypeScript');
