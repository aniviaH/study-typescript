/*~ If your library has properties exposed on a global variable,
 *~ place them here.
 *~ You should also place types (interfaces and type alias) here.
 */
 declare namespace libXYZ {
  //~ We can write 'libXYZ.timeout = 50;'
  let timeout: number;
  //~ We can access 'libXYZ.version', but not change it
  const version: string;
  //~ There's some class we can create via 'let c = new libXYZ.Cat(42)'
  //~ Or reference e.g. 'function f(c: libXYZ.Cat) { ... }
  class Cat {
    constructor(n: number);
    //~ We can read 'c.age' from a 'Cat' instance
    readonly age: number;
    //~ We can invoke 'c.purr()' from a 'Cat' instance
    purr(): void;
  }
  //~ We can declare a variable as
  //~   'var s: libXYZ.CatSettings = { weight: 5, name: "Maru" };'
  interface CatSettings {
    weight: number;
    name: string;
    tailLength?: number;
  }
  //~ We can write 'const v: libXYZ.VetID = 42;'
  //~  or 'const v: libXYZ.VetID = "bob";'
  type VetID = string | number;
  //~ We can invoke 'libXYZ.checkCat(c)' or 'libXYZ.checkCat(c, v);'
  function checkCat(c: Cat, s?: VetID);
}