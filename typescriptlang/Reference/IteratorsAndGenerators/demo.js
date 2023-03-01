function toArray(xs) {
    return [...xs];
}
// toArray({a: 1})
// Argument of type '{ a: number; }' is not assignable to parameter of type 'Iterable<unknown>'.
// Object literal may only specify known properties, and 'a' does not exist in type 'Iterable<unknown>'.
// console.log(toArray(1)) // runtime error -> TypeError: xs is not iterable
// Argument of type 'number' is not assignable to parameter of type 'Iterable<unknown>'.
console.log(toArray('123'));
export {};
