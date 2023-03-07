var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
var str = 'Hello!';
try {
    for (var str_1 = __values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
        var s = str_1_1.value;
        console.log(s);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (str_1_1 && !str_1_1.done && (_a = str_1["return"])) _a.call(str_1);
    }
    finally { if (e_1) throw e_1.error; }
}
