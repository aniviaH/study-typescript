"use strict";
exports.__esModule = true;
var foo = require("./foo");
var foo_1 = require("./foo");
var x = foo.SomeVar.a;
var y = {
    count: 1
};
console.log(x.count);
console.log(y.count);
var x2 = foo_1.Bar.a;
var y2 = {
    count: '1'
};
console.log(x2.count);
console.log(y2.count);
