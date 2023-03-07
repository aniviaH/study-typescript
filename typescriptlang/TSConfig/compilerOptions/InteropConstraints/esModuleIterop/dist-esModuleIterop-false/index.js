"use strict";
exports.__esModule = true;
var fs = require("fs");
var lodash_1 = require("lodash");
// Module '"e:/010-TypeScript/study-typescript/typescriptlang/TSConfig/compilerOptions/InteropConstraints/esModuleIterop/node_modules/@types/lodash/index"' can only be default-imported using the 'esModuleInterop' flag
// import {chunk} from 'lodash'
fs.writeFileSync('file.txt', 'file text--');
var c = lodash_1["default"].chunk(['a', 'b', 'c', 'd'], 2);
console.log(c);
