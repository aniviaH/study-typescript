export {}

const obj = {
  a: 1,
  b: 2,
  c: 3
}

obj[Symbol.iterator] = function *() {
  for (const key in obj) {
    yield [key, obj[key]]
  }
}

console.log([...obj])
