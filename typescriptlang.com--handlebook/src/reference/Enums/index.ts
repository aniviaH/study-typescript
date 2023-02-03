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

// Each enum member has a value associated with it which can be either constant or computed. An enum member is considered constant if:

// 1. It is the first member in the enum and it has no initializer, in which case it’s assigned the value 0:

// EE1.X is constant:
enum EE1 {
  X,
}
type X = EE1.X
let x: EE1.X = 11
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
