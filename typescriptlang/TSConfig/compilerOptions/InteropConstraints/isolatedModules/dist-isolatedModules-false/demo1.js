"use strict";
exports.__esModule = true;
exports.someFunction = void 0;
var module_1 = require("./module");
exports.someFunction = module_1.someFunction;
(0, module_1.someFunction)();
// Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'.
