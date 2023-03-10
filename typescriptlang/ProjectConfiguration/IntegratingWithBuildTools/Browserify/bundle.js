(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./utils":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.dateTimestamp = void 0;
function dateTimestamp(date) {
    return date.getTime();
}
exports.dateTimestamp = dateTimestamp;

},{}]},{},[1]);
