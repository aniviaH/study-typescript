var Enum2;
(function (Enum2) {
    Enum2[Enum2["A"] = 1] = "A";
    Enum2[Enum2["B"] = 2] = "B";
})(Enum2 || (Enum2 = {}));
// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. 
// Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.
const e2 = Enum2.B;
console.log('e2: ', e2);
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
let directions = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
];
console.log('directions: ', directions);
export {};
