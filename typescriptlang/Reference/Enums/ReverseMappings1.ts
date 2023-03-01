export {}

enum Enum {
  A,
}

let a = Enum.A;

console.log('a: ', a);
console.log('Enum: ', Enum);
console.log('typeof a: ', typeof a);

let nameOfA = Enum[a] // "A"
console.log('nameOfA: ', nameOfA);