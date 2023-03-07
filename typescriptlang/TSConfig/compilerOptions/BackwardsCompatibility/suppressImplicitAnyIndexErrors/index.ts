const obj = { x: 10 }

// // 如果确实不希望这个报错提示，使用 @ts-ignore
const foo = obj['foo']
// Element implicitly has an 'any' type because expression of type '"foo"' can't be used to index type '{ x: number; }'.
//   Property 'foo' does not exist on type '{ x: number; }'.
console.log(foo)