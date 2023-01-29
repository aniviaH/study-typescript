import { pi, phi, absolute } from "./maths.js";

import { pi as π } from "./maths.js";

// import fs = require("fs");

import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;

import type { createCatName } from "./animal.js";
            // (alias) const createCatName: () => string
            // import createCatName
// const name = createCatName();
// 'createCatName' cannot be used as a value because it was imported using 'import type'.
 
console.log(pi);
const absPhi = absolute(phi);

console.log(π);

// const code = fs.readFileSync("hello.ts", "utf8");
