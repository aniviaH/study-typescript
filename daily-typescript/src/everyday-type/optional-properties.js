function printName2(obj) {
    var _a;
    // Error - might crash if 'obj.last' wasn't provided!
    // console.log(obj.last.toUpperCase()); // Object is possibly 'undefined'.
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }
    // A safe alternative using modern JavaScript syntax:
    console.log((_a = obj.last) === null || _a === void 0 ? void 0 : _a.toUpperCase());
}
printName2({ first: 'tom', last: 'li' });
