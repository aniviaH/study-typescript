/** Mapped Types */

/** 1. Mapping Modifiers */
// When you don’t want to repeat yourself, sometimes a type needs to be based on another type.

// Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:
interface Horse {
  run: () => void
}
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
  test: {
    run() {}
  }
};

// A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type:

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

// In this example, OptionsFlags will take all the properties from the type Type and change their values to be a boolean.

type conformsOfBoolean1 = OptionsFlags<OnlyBoolsAndHorses>
      // type conformsOfBoolean1 = {
      //   [x: string]: boolean;
      // }

type conformsOfBoolean2 = OptionsFlags<keyof OnlyBoolsAndHorses>
    // type conformsOfBoolean2 = string | number

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
    // type FeatureOptions = {
    //   darkMode: boolean;
    //   newUserProfile: boolean;
    // }
type HorseOptions = OptionsFlags<Horse>
    // type HorseOptions = {
    //   run: boolean;
    // }

/** 1. Mapping Modifiers */

// here are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.

// You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed.

// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
    // type UnlockedAccount = {
    //   id: string;
    //   name: string;
    // }

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User2 = Concrete<MaybeUser>;
    // type User2 = {
    //   id: string;
    //   name: string;
    //   age: number;
    // }

/** 2. Key Remapping via as */

// In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an as clause in a mapped type:
interface NewKeyType {
}
// type MappedTypeWithNewProperties<Type> = {
//   [Properties in keyof Type as NewKeyType]: Type[Properties]
// }

// You can leverage features like template literal types to create new property names from prior ones:

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person9 {
  name: string;
  age: number;
  location: string;
}

interface GettersTest {
  a: string;
  b: number;
  c: boolean;
  d: void;
}

type LazyPerson = Getters<Person9>;
      // type LazyPerson = {
      //   getName: () => string;
      //   getAge: () => number;
      //   getLocation: () => string;
      // }
type GettersTest1 = Getters<GettersTest>;
      // type GettersTest1 = {
      //   getA: () => string;
      //   getB: () => number;
      //   getC: () => boolean;
      //   getD: () => void;
      // }

// You can filter out keys by producing never via a conditional type:

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle3 {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
// type KindlessCircle = {
//   radius: number;
// }

// You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type TestEventConfig1 = EventConfig<{
  kind: string;
  z: number
}>
// type TestEventConfig1 = {
//   [x: string]: (event: {
//       kind: string;
//       z: number;
//   }) => void;
// }

type TestEventConfig2 = EventConfig<{
  kind: 'triangle';
  z: number
}>
// type TestEventConfig2 = {
//   triangle: (event: {
//       kind: 'triangle';
//       z: number;
//   }) => void;
// }

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = {
//   square: (event: SquareEvent) => void;
//   circle: (event: CircleEvent) => void;
// }

/** 3. Further Exploration */

type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
// type ObjectsNeedingGDPRDeletion = {
//   id: false,
//   mame: true
// }
