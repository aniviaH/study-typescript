export {}

/* import * as foo from './foo'
import { Bar } from './foo'

let x: foo.SomeType = foo.SomeVar.a
let y: foo.SomeType = {
  count: 1
}
console.log(x.count)
console.log(y.count);


let x2: Bar = Bar.a
let y2: Bar = {
  count: '1'
}
console.log(x2.count);
console.log(y2.count);
 */

class Foo {
  x: number = 0
}
interface Foo {
  y: number
}
namespace Foo {
  export let z: boolean = true
}

const f: Foo = {
  x: 0,
  y: 1,
}
const fz = Foo.z
console.log(fz);

class C {

}

namespace C {
  export let x: number = 1
  export let y: string = 'y'
  export interface D {
    d: string[]
  }
}

const cx = C.x
const cy = C.y
let cd: C.D = {
  d: ['1']
}
console.log(cx);
console.log(cy);
console.log(cd);
const c = new C()



namespace X {
  export interface Y {}
  export class Z {}
}
// ... elsewhere ...
namespace X {
  export var Y: number;
  export namespace Z {
    export class C {}
  }
}
type X = string;