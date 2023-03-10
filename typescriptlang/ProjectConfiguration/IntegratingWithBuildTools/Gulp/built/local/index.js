"use strict";
exports.__esModule = true;
exports.hello = void 0;
var utils_1 = require("./utils");
var hello = function (hello) {
    return hello;
};
exports.hello = hello;
var c = 1 /* Config.ver */;
console.log('Hello TypeScript');
console.log(c);
var now = new Date();
// @ts-ignore
var nowTimestamp = (0, utils_1.dateTimestamp)(now);
console.log(nowTimestamp);
function testAny(a) {
    return a;
}
