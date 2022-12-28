export let a3 = [1, 2, 3] as const;
// a3.push(102); // error
// a3[0] = 101; // error

export let a4 = {a: 'a', b: 'b'} as const
// a4.a = 'aa'
console.log('a4--', a4);