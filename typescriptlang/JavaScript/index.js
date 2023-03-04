// @ts-check

export {}

/**
 * @type {number}
 */
var x;

x = 1
// x = false // Type 'boolean' is not assignable to type 'string'.

// @ts-ignore
x = false

// @ts-expect-error
x = true