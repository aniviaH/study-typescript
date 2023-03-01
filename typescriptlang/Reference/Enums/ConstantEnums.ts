export {}

const enum Enum2 {
  A = 1,
  B = A * 2,
}

// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. 
// Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

const e2 = Enum2.B
console.log('e2: ', e2);

const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

 
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

console.log('directions: ', directions);

const enum Numbers {
  Zero = 0,
  One = 1,
  Two = One * 2
}
var a = Numbers.Zero
console.log('a: ', a);
console.log(Numbers.Zero + Numbers.One + Numbers.Two);


declare enum Enum3 {
  A = 1,
  B,
  C = 2,
}

// One important difference between ambient and non-ambient enums is that, 
// in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. 
// By contrast, an ambient (and non-const) enum member that does not have an initializer is always considered computed.

const b = Enum3.B  // runtime error -> ReferenceError: Enum3 is not defined
console.log('b: ', b);


/** Objects vs Enums */

// In modern TypeScript, you may not need an enum when an object with /as const/ could suffice:

const enum EDirection {
  Up,
  Down,
  Left,
  Right,
  A
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up;
          // (enum member) EDirection.Up = 0

ODirection.Up;
          // (property) Up: 0

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the values

type ODirectionValue = typeof ODirection[keyof typeof ODirection];
// type DirectionValue = 0 | 1 | 2 | 3
function run(dir: ODirectionValue) {}

walk(EDirection.Left);
run(ODirection.Right)

function jump(dir: ODirectionValue) {

}
jump(EDirection.Down)
// jump(EDirection.A) // Argument of type 'EDirection.A' is not assignable to parameter of type 'ODirectionValue'.