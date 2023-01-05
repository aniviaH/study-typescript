"use strict";
class SomePoint {
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}
class SomePoint2 {
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}
function getLength(obj) {
    return obj.length;
}
function wrapInArray(obj) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}
function logPoint(point) {
    console.log("x = " + point.x + ", y = " + point.y);
}
function logName(x) {
    console.log("Hello, " + x.name);
}
const obj = {
    x: 0,
    y: 0,
    name: "Origin",
};
logPoint(obj);
logName(obj);
class Empty {
}
function fn(arg) {
    console.log("args---", arg);
}
fn({ k: 10 });
class Car {
    drive() {
    }
}
class Golfer {
    drive() {
    }
}
let w = new Golfer();
console.log(typeof new Car());
let fst = (a, b) => a;
let fst2 = (a, b) => a;
const anys = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });
let o = { x: "hi", extra: 1 };
let o3 = o;
class Three {
    constructor() {
        this.p = "Hello";
    }
}
let x = { p: "hi", x: 2 };
let two = x;
two = new Three();
let lit = { a: 1 };
let lit2 = { a: 2, b: 3 };
const s1 = {
    name: "张三",
    age: 29,
};
const s2 = {
    name: "张三",
    age: 29,
    sex: "男",
    f: 3,
};
const s3 = s2;
function start(arg) {
    if (typeof arg === "string") {
        return commonCase(arg);
    }
    else if (Array.isArray(arg)) {
        return arg.map(commonCase).join(",");
    }
    else if (typeof arg === "function") {
        return commonCase(arg());
    }
    else {
        return commonCase(arg.s);
    }
    function commonCase(s) {
        return s;
    }
}
const c1 = {
    a: "a",
};
pad("hi", 10, "left");
let s = "right";
pad("hi", 10, s);
let ss = "I'm a string!";
let sns = map((n) => n.toString(), [1, 2, 3]);
let sns2 = map([1, 2, 3], (n) => n.toString());
let i = run((o) => {
    o.inference = "INSERT STATE HERE";
});
let ii = run((t) => { });
const f2 = () => {
    console.log("f2---");
    return 1;
};
f2();
let x2 = [101.1, 999.9];
let sss = "s";
const shape = {
    kind: "circle",
    radius: 1,
};
function area(s) {
    if (s.kind === "circle") {
        return Math.PI * s.radius * s.radius;
    }
    else if (s.kind === "square") {
        return s.x * s.x;
    }
    else {
        return (s.x * s.y) / 2;
    }
}
function height(s) {
    if (s.kind === "circle") {
        return 2 * s.radius;
    }
    else {
        return s.x;
    }
}
function liftArray(t) {
    return [t];
}
liftArray(1);
function firstish(t1, t2) {
    return t1.length > t2.length ? t1 : t2;
}
firstish({ length: 1 }, { length: 2 });
const a = [1, 2, 3];
a.push(102);
a[0] = 101;
let rx = { x: 1 };
let a1 = [1, 2, 3];
let b = [1, 2, 3];
let a2 = ['1', 2];
let a3 = [1, 2, 3];
let a4 = { a: 'a', b: 'b' };
console.log('a4--', a4);
//# sourceMappingURL=d.js.map