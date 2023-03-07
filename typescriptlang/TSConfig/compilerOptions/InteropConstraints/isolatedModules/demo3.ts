declare const enum Numbers {
  Zero = 1,
  One = 2
}

console.log(Numbers.Zero + Numbers.One);
// Cannot access ambient const enums when the '--isolatedModules' flag is provided.

export {}
