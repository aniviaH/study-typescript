let nu = null

// nu = undefined

const obj3 = {
  a: '1'
}

// obj3.a = null

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
    console.log(x);
  } else {
    console.log("Hello, " + x.toUpperCase());
  }

  // console.log("Hello, " + x.toUpperCase());
}

doSomething('s')
doSomething(null)

// Non-null Assertion Operator (Postfix !)
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}