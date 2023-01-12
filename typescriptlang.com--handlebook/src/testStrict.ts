// @ts-ignore
function noImplicitAny (p1) { // noImplicitAny: true => Parameter 'p1' implicitly has an 'any' type.
  console.log(p1);
}

noImplicitAny(null)

function strictNullChecks () {
  let str = 'hello'

  // @ts-ignore
  str = null // strictNullChecks: true => Type 'null' is not assignable to type 'string'.
}
strictNullChecks()
