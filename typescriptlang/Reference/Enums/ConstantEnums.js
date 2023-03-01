// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. 
// Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.
const e2 = 2 /* Enum2.B */;
console.log('e2: ', e2);
let directions = [
    0 /* Direction.Up */,
    1 /* Direction.Down */,
    2 /* Direction.Left */,
    3 /* Direction.Right */,
];
console.log('directions: ', directions);
var a = 0 /* Numbers.Zero */;
console.log('a: ', a);
console.log(0 /* Numbers.Zero */ + 1 /* Numbers.One */ + 2 /* Numbers.Two */);
// One important difference between ambient and non-ambient enums is that, 
// in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. 
// By contrast, an ambient (and non-const) enum member that does not have an initializer is always considered computed.
const b = Enum3.B;
console.log('b: ', b);
export {};
