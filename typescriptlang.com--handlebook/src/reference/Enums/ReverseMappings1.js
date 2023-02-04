var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
let a = Enum.A;
console.log('a: ', a);
console.log('Enum: ', Enum);
console.log('typeof a: ', typeof a);
let nameOfA = Enum[a]; // "A"
console.log('nameOfA: ', nameOfA);
export {};
