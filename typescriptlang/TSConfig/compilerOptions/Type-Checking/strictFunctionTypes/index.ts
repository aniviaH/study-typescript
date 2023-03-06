function fn (x: string) {
  console.log('Hello, ' + x.toLowerCase())
}

type StringOrNumberFunc = (ns: string | number) => void

// Unsafe assignment
let func: StringOrNumberFunc = fn
// Type '(x: string) => void' is not assignable to type 'StringOrNumberFunc'.
//   Types of parameters 'x' and 'ns' are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.


// Unsafe call - will crash
func(10)

/*
During development of this feature, we discovered a large number of inherently unsafe class hierarchies, including some in the DOM. Because of this, the setting only applies to functions written in function syntax, not to those in method syntax:
*/
type Methodish = {
  func(x: string | number): void
}

function fn2 (x: string) {
  console.log('Hello, ' + x.toLowerCase())
}

// Ultimately an unsfe assignment, but not detected
const m: Methodish = {
  func: fn2
}
m.func(10) // will crash - runtime error