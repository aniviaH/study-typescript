"use strict";
exports.__esModule = true;
var A = require("./moduleA"); // OK, 'moduleA' passed on the command-line
var B = require("./moduleB"); // Error TS2307: Cannot find module 'moduleB'.
console.log(A);
console.log(B);
// tsc app.ts moduleA.ts --noResolve
