import {someType, someFunction} from './someModule'

someFunction('111')

export {type someType, someFunction}

declare const enum Numbers {
  Zero = 0,
  One = 1
}

// console.log(Numbers.Zero + Numbers.One); // Cannot access ambient const enums when the '--isolatedModules' flag is provided.