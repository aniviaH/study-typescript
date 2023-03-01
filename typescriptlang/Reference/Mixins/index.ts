// Along with traditional OO hierarchies, another popular way of building up classes from reusable components is to build them by combining simpler partial classes. 
// You may be familiar with the idea of mixins or traits for languages like Scala, and the pattern has also reached some popularity in the JavaScript community.

/** How Does A Mixin Work? */

// The pattern relies on using generics with class inheritance to extend a base class. 
// TypeScript’s best mixin support is done via the class expression pattern. 
// ou can read more about how this pattern works in JavaScript here<https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/>.

// To get started, we’ll need a class which will have the mixins applied on top of:

class Sprite {
  name = "";
  x = 0;
  y = 0;
 
  constructor(name: string) {
    this.name = name;
  }
}

// Then you need a type and a factory function which returns a class expression extending the base class.


// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.

type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    _scale = 1;
 
    setScale(scale: number) {
      this._scale = scale;
    }
 
    get scale(): number {
      return this._scale;
    }
  };
}

class Scaling extends Sprite {
  _scale = 1;

  constructor (name: string) {
    super(name)
  }

  setScale(scale: number) {
    this._scale = scale;
  }

  get scale(): number {
    return this._scale;
  }
};

// With these all set up, then you can create a class which represents the base class with mixins applied:

// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);
 
const flappySprite = new EightBitSprite("Bird");
flappySprite.setScale(0.8);
console.log(flappySprite.name);
console.log(flappySprite.scale);

const scaling = new Scaling("Fish")
scaling.setScale(0.4)
console.log(scaling.name);
console.log(scaling.scale);


/** Constrained Mixins */

// In the above form, the mixin’s have no underlying knowledge of the class which can make it hard to create the design you want.

// To model this, we modify the original constructor type to accept a generic argument.

// This was our previous constructor:
// type Constructor = new (...args: any[]) => {};

// Now we use a generic version which can apply a constraint on
// the class which this mixin is applied to
type GConstructor<T = {}> = new (...args: any[]) => T;

// This allows for creating classes which only work with constrained base classes:

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;
type Loggable = GConstructor<{ print: () => void }>;

// Then you can create mixins which only work when you have a particular base to build on:

function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      console.log('jump---');
      // This mixin will only work if it is passed a base
      // class which has setPos defined because of the
      // Positionable constraint.
      this.setPos(0, 20);
    }
  };
}
class Positionable1 {
  name: string;
  constructor (name: string) {
    this.name = name
  }

  setPos(x: number, y: number) {
    console.log('setPos---', x, y);
    console.log();
  }
}
const JumpableClass = Jumpable(Positionable1)
const frog = new JumpableClass('frog')
console.log(frog.name);
console.log(frog.jump());


/** Alternative Pattern */

// Previous versions of this document recommended a way to write mixins where you created both the runtime and type hierarchies separately, then merged them at the end:

// Each mixin is a traditional ES class
class Jumpable2 {
  jump() {
    console.log('jump---');
  }
}
 
class Duckable2 {
  duck() {}
}
 
// Including the base
class Sprite2 {
  x = 0;
  y = 0;
}
 
// Then you create an interface which merges
// the expected mixins with the same name as your base
interface Sprite2 extends Jumpable2, Duckable2 {}
// Apply the mixins into the base class via
// the JS at runtime
applyMixins(Sprite2, [Jumpable2, Duckable2]);
 
let player = new Sprite2();
player.jump();
console.log(player.x, player.y);
 
// This can live anywhere in your codebase:
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

// This pattern relies less on the compiler, and more on your codebase to ensure both runtime and type-system are correctly kept in sync.


/** Constraints */

// The mixin pattern is supported natively inside the TypeScript compiler by code flow analysis.
// There are a few cases where you can hit the edges of the native support.

// Decorators and Mixins #4881

// You cannot use decorators to provide mixins via code flow analysis:

// A decorator function which replicates the mixin pattern:
const Pausable = (target: typeof Player) => {
  return class Pausable extends target {
    shouldFreeze = false;
  };
};

@Pausable
class Player {
  x = 0;
  y = 0;
}

// The Player class does not have the decorator's type merged:
const player2 = new Player();
// player.shouldFreeze; // Property 'shouldFreeze' does not exist on type 'Sprite2'.
// @ts-ignore
console.log('player.shouldFreeze: ', player2.shouldFreeze);
// @ts-ignore
player2.shouldFreeze = true
// @ts-ignore
console.log('player.shouldFreeze: ', player2.shouldFreeze);

// The runtime aspect could be manually replicated via
// type composition or interface merging.

type FreezablePlayer = Player & { shouldFreeze: boolean };

const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;
playerTwo.shouldFreeze = true
console.log('playerTwo.shouldFreeze: ', playerTwo.shouldFreeze);


// Static Property Mixins #17829

// More of a gotcha than a constraint. The class expression pattern creates singletons, so they can’t be mapped at the type system to support different variable types.

// You can work around this by using functions to return your classes which differ based on a generic:

function base3<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}
 
function derived3<T>() {
  class Derived extends base3<T>() {
    static anotherProp: T;
  }
  return Derived;
}
 
class Spec3 extends derived3<string>() {}
 
Spec3.prop; // string
Spec3.anotherProp; // string
