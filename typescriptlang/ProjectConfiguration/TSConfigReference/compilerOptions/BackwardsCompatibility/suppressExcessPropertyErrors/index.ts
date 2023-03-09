type Point = {x: number, y: number}

// // 如果确实不希望这个报错提示，使用 @ts-ignore
const p: Point = {x: 1, y: 1, m : 10}
// Type '{ x: number; y: number; m: number; }' is not assignable to type 'Point'.
//   Object literal may only specify known properties, and 'm' does not exist in type 'Point'.