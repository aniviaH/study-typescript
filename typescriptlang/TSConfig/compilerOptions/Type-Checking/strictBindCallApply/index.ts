function fn(x: string) {
  return parseInt(x)
}

const n1 = fn.call(undefined, '10')

const n2 = fn.call(undefined, false)
                            // Argument of type 'boolean' is not assignable to parameter of type 'string'.

const n3 = fn.apply(undefined, [false])
                            // Type 'boolean' is not assignable to type 'string'.