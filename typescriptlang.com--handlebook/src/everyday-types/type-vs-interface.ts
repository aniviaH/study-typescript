// Type aliases and interfaces are very similar, and in many cases you can choose between them freely. 
// Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
// Extending an interface
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
const bear = getBear()
bear.name
bear.honey

// Extending a type via intersections(交叉类型)
type Animal2 = {
  name: string
}

type Bear2 = Animal2 & { 
  honey: boolean 
}

const bear2 = getBear();
bear2.name;
bear2.honey;

declare function getBear(): Bear



// Adding new fields to an existing interface
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

interface TypeScriptAPI {
  transpileModule(src: string, opt: {}): void
}

// A type cannot be changed after being created
// type Window = {
//   title: string
// }

// type Window = {
//   ts: TypeScriptAPI
// }

// Error: Duplicate identifier 'Window'.