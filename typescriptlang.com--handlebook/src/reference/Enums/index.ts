export {}

// Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.

// Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. 
// TypeScript provides both numeric and string-based enums.


/** Numeric enums */

// We’ll first start off with numeric enums, which are probably more familiar if you’re coming from other languages. 
// An enum can be defined using the enum keyword.

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// Above, we have a numeric enum where Up is initialized with 1. All of the following members are auto-incremented from that point on. 
// In other words, Direction.Up has the value 1, Down has 2, Left has 3, and Right has 4.

// If we wanted, we could leave off the initializers entirely:

enum Direction2 {
  Up,
  Down,
  Left,
  Right,
}

// Here, Up would have the value 0, Down would have 1, etc.
// This auto-incrementing behavior is useful for cases where we might not care about the member values themselves, but do care that each value is distinct from other values in the same enum.

// Using an enum is simple: just access any member as a property off of the enum itself, and declare types using the name of the enum:

enum UserResponse {
  No = 0,
  Yes = 1,
}

 
function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);

// Numeric enums can be mixed in [computed and constant members (see below)]. 
// The short story is, enums without initializers either need to be first, or have to come after numeric enums initialized with numeric constants or other constant enum members. 
// In other words, the following isn’t allowed:

declare function getSomeValue (): number
// enum E {
//   A = getSomeValue(),
//   B, // Enum member must have initializer.
//   // Enum member must have initializer.
// }
enum E2 {
  A,
  B,
  C = 'a',
  D = 4,
  E
}


/** String enums */

// String enums are a similar concept, but have some subtle [runtime differences] as documented below.
// In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.

enum E3 {
  Right = 'RIGHT',
  Left = 0
}
enum Direction3 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
  // Right = E3.Right, // Computed values are not permitted in an enum with string valued members.
}

// While string enums don’t have auto-incrementing behavior, string enums have the benefit that they “serialize” well. 
// In other words, if you were debugging and had to read the runtime value of a numeric enum, the value is often opaque(不透明的；难懂的，隐晦的) - it doesn’t convey any useful meaning on its own (though [reverse mapping] can often help). 
// String enums allow you to give a meaningful and readable value when your code runs, independent of the name of the enum member itself.


/** Heterogeneous(异构) enums */

// Technically enums can be mixed with string and numeric members, but it’s not clear why you would ever want to do so:

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// Unless you’re really trying to take advantage of JavaScript’s runtime behavior in a clever way, it’s advised that you don’t do this.

// 包含字符串值的成员的枚举不能引用别的枚举的成员
// enum BooleanLikeHeterogeneousEnum2 {
//   // x = 0, // OK
//   y = '1',
//   f = E3.Left, // Computed values are not permitted in an enum with string valued members.
//   n = E3.Right // Computed values are not permitted in an enum with string valued members.
// }



/** Computed and constant members */

// Each enum member has a value associated with it which can be either constant or computed. 枚举值要么是常量（constant），要么是计算值（computed）

// An enum member is considered constant if:

// 1. It is the first member in the enum and it has no initializer, in which case it’s assigned the value 0:

// EE1.X is constant:
enum EE1 {
  X,
  Y
}
type X = EE1.X
// let x: X = EE1.Y // Type 'EE1.Y' is not assignable to type 'EE1.X'.
let x: X = EE1.X // OK
x = 2

// 2. It does not have an initializer and the preceding enum member was a numeric constant. In this case the value of the current enum member will be the value of the preceding enum member plus one.

// All enum members in 'EE2' and 'EE3' are constant.
enum EE2 {
  X,
  Y,
  Z,
}
 
enum EE3 {
  A = 1,
  B,
  C,
}

// 3. The enum member is initialized with a constant enum expression. A constant enum expression is a subset of TypeScript expressions that can be fully evaluated at compile time. An expression is a constant enum expression if it is:
// a literal enum expression (basically a string literal or a numeric literal)
// a reference to previously defined constant enum member (which can originate from a different enum)
// a parenthesized constant enum expression
// one of the +, -, ~ unary operators applied to constant enum expression
// +, -, *, /, %, <<, >>, >>>, &, |, ^ binary operators with constant enum expressions as operands

// It is a compile time error for constant enum expressions to be evaluated to NaN or Infinity.

// In all other cases enum member is considered computed.

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  // G = "123".length,
}


/** Union enums and enum member types */

// There is a special subset of constant enum members that aren’t calculated: literal enum members. 
// A literal enum member is a constant enum member with no initialized value, or with values that are initialized to

// any string literal (e.g. "foo", "bar, "baz")
// any numeric literal (e.g. 1, 100)
// a unary minus applied to any numeric literal (e.g. -1, -100)

// When all members in an enum have literal enum values, some special semantics come into play.

// The first is that enum members also become types as well! For example, we can say that certain members can only have the value of an enum member:

enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  // kind: ShapeKind.Square, // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  kind: ShapeKind.Circle,
  radius: 100
}


// The other change is that enum types themselves effectively become a union of each enum member. 
// With union enums, the type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself. 
// Because of that, TypeScript can catch bugs where we might be comparing values incorrectly. For example:

enum EE4 {
  Foo,
  Bar,
  ZZZ,
  FFF
}

function f(x: EE4) {
  // if (x !== EE4.Foo || x !== EE4.Bar) {
  //   // This comparison appears to be unintentional because the types 'EE4.Foo' and 'EE4.Bar' have no overlap.
  // }
}


/** Enums at runtime */

// Enums are real objects that exist at runtime. For example, the following enum

enum EE5 {
  X,
  Y,
  Z,
}

// can actually be passed around to functions

function f2(obj: { X: number }) {
  return obj.X;
}

// Works, since 'EE5' has a property named 'X' which is a number.
f2(EE5)


/** Enums at compile time */

// Even though Enums are real objects that exist at runtime, the keyof keyword works differently than you might expect for typical objects.
// Instead, use keyof typeof to get a Type that represents all Enum keys as strings.

enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

const logLevelStrings: LogLevelStrings = 'DEBUG'

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");


/** Reverse mappings */

// In addition to creating an object with property names for members, numeric enums members also get a reverse mapping from enum values to enum names. 
// For example, in this example:

enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a] // "A"

// TypeScript compiles this down to the following JavaScript:

/* 
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
let a = Enum.A;
let nameOfA = Enum[a]; // "A" 
*/

// Keep in mind that string enum members do not get a reverse mapping generated at all.


/** const enums */

// In most cases, enums are a perfectly valid solution. However sometimes requirements are tighter. 
// To avoid paying the cost of extra generated code and additional indirection when accessing enum values, it’s possible to use const enums. 
// Const enums are defined using the const modifier on our enums:

const enum Enum2 {
  A = 1,
  B = A * 2,
}

// Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. 
// Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

const e2 = Enum2.A

const enum Direction4 {
  Up,
  Down,
  Left,
  Right,
  // A = Math.PI // const enum member initializers can only contain literal values and other computed enum values. 常量枚举成员必须是字面量值，不能是计算值
}

 
let directions = [
  Direction4.Up,
  Direction4.Down,
  Direction4.Left,
  Direction4.Right,
];

// in generated code will become

// let directions = [
//   0 /* Direction.Up */,
//   1 /* Direction.Down */,
//   2 /* Direction.Left */,
//   3 /* Direction.Right */,
// ];


/** Const enum pitfalls */

// Inlining enum values is straightforward at first, but comes with subtle implications. 
// These pitfalls pertain to ambient const enums only (basically const enums in .d.ts files) and sharing them between projects, but if you are publishing or consuming .d.ts files, these pitfalls likely apply to you, because tsc --declaration transforms .ts files into .d.ts files.

// For the reasons laid out in the isolatedModules documentation, that mode is fundamentally incompatible with ambient const enums. This means if you publish ambient const enums, downstream consumers will not be able to use isolatedModules and those enum values at the same time.
// You can easily inline values from version A of a dependency at compile time, and import version B at runtime. Version A and B’s enums can have different values, if you are not very careful, resulting in surprising bugs, like taking the wrong branches of if statements. These bugs are especially pernicious because it is common to run automated tests at roughly the same time as projects are built, with the same dependency versions, which misses these bugs completely.
// importsNotUsedAsValues: "preserve" will not elide imports for const enums used as values, but ambient const enums do not guarantee that runtime .js files exist. The unresolvable imports cause errors at runtime. The usual way to unambiguously elide imports, type-only imports, does not allow const enum values, currently.

// Here are two approaches to avoiding these pitfalls:

// A. Do not use const enums at all. You can easily ban const enums with the help of a linter. Obviously this avoids any issues with const enums, but prevents your project from inlining its own enums. Unlike inlining enums from other projects, inlining a project’s own enums is not problematic and has performance implications. 
// B. Do not publish ambient const enums, by deconstifying them with the help of preserveConstEnums. This is the approach taken internally by the TypeScript project itself. preserveConstEnums emits the same JavaScript for const enums as plain enums. You can then safely strip the const modifier from .d.ts files in a build step.

// This way downstream consumers will not inline enums from your project, avoiding the pitfalls above, but a project can still inline its own enums, unlike banning const enums entirely.

/** Ambient enums */

// Ambient enums are used to describe the shape of already existing enum types.
// 仅用作类型约束（或者说只声明不实现）的枚举，这一点与常量枚举类似，但环境枚举（ambient enums）用来描述现有枚举的类型

declare enum Enum3 {
  A = 1,
  B,
  C = 2,
}

// One important difference between ambient and non-ambient enums is that, 
// in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. 
// By contrast, an ambient (and non-const) enum member that does not have an initializer is always considered computed.

const b = Enum3.B


declare enum CSSNumericBaseType {
  'length',
  'angle',
  'time',
  'frequency',
  'resolution',
  'flex',
  'percent',
}