import * as A from "./moduleA"; // OK, 'moduleA' passed on the command-line
import * as B from "./moduleB"; // Error TS2307: Cannot find module 'moduleB'.

console.log(A);
console.log(B);

// tsc app.ts moduleA.ts --noResolve