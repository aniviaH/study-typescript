// Template literal types build on string literal types, and have the ability to expand into many strings via unions.

// They have the same syntax as template literal strings in JavaScript, but are used in type positions. 
// When used with concrete literal types, a template literal produces a new string literal type by concatenating the contents.

type World = "world";
 
type Greeting = `hello ${World}`;
    // type Greeting = "hello world"

// When a union is used in the interpolated position, the type is the set of every possible string literal that could be represented by each union member:

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
    // type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

// For each interpolated position in the template literal, the unions are cross multiplied:

type AllLocaleIDs2 = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
 
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs2}`;

// We generally recommend that people use ahead-of-time generation for large string unions, but this is useful in smaller cases.

/** 1. String Unions in Types */

// The power in template literals comes when defining a new string based on information inside a type.

// Consider the case where a function (makeWatchedObject) adds a new function called on() to a passed object. 
// In JavaScript, its call might look like: makeWatchedObject(baseObject). 
// We can imagine the base object as looking like:

const passedObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
};

// type MakeWatchedObject<T> = (obj: T) => {
//   [P in keyof T as `${P}Changed`]: (name: T[P]) => void
// }
// function makeWatchedObject (obj: object) {

// }

type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
 
// makeWatchedObject has added `on` to the anonymous Object
 
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

// With this, we can build something that errors when given the wrong property:

const person2 = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", () => {});

// Prevent easy human error (using the key instead of the event name)
// person.on("firstName", (newval) => {});
// Argument of type '"firstName"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

// It's typo-resistant
// person.on("frstNameChanged", (newval) => {});
// Argument of type '"frstNameChanged"' is not assignable to parameter of type '"firstNameChanged" | "lastNameChanged" | "ageChanged"'.

/** 2. Inference with Template Literals */

// Notice that we did not benefit from all the information provided in the original passed object. 
// Given change of a firstName (i.e. a firstNameChanged event), we should expect that the callback will receive an argument of type string. 
// Similarly, the callback for a change to age should receive a number argument. We’re naively using any to type the callBack’s argument. 
// Again, template literal types make it possible to ensure an attribute’s data type will be the same type as that attribute’s callback’s first argument.

// The key insight that makes this possible is this: we can use a function with a generic such that:

// 1. The literal used in the first argument is captured as a literal type
// 2. That literal type can be validated as being in the union of valid attributes in the generic
// 3. The type of the validated attribute can be looked up in the generic’s structure using Indexed Access
// 4. This typing information can then be applied to ensure the argument to the callback function is of the same type

type PropEventSource2<Type> = {
  on<Key extends string & keyof Type> (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void
}

declare function makeWatchedObject2<Type>(obj: Type): Type & PropEventSource2<Type>;

const perso3 = makeWatchedObject2({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

perso3.on("firstNameChanged", newName => {
                              // (parameter) newName: string
  console.log(`new name is ${newName.toUpperCase()}`);
});
perso3.on("ageChanged", newAge => {
                        // (parameter) newAge: number
  if (newAge < 0) {
      console.warn("warning! negative age");
  }
})

// Here we made on into a generic method.

// When a user calls with the string "firstNameChanged", TypeScript will try to infer the right type for Key. 
// To do that, it will match Key against the content prior to "Changed" and infer the string "firstName". 
// Once TypeScript figures that out, the on method can fetch the type of firstName on the original object, which is string in this case. Similarly, when called with "ageChanged", TypeScript finds the type for the property age which is number.

// Inference can be combined in different ways, often to deconstruct strings, and reconstruct them in different ways.

/** 3. Intrinsic String Manipulation Types */

// To help with string manipulation, TypeScript includes a set of types which can be used in string manipulation. 
// These types come built-in to the compiler for performance and can’t be found in the .d.ts files included with TypeScript.

/** 3.1 Uppercase<StringType> */

// Converts each character in the string to the uppercase version.

type Greeting2 = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"

/** 3.2 Lowercase<StringType> */

// Converts each character in the string to the lowercase equivalent.

type Greeting3 = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
// type QuietGreeting = "hello world"

type ASCIICacheKey2<Str extends string> = `id-${Lowercase<Str>}`
type MainID2 = ASCIICacheKey<"MY_APP">
// type MainID2 = "ID-MY_APP"

/** 3.3 Capitalize<StringType> */

// onverts the first character in the string to an uppercase equivalent.

type LowercaseGreeting = "hello, world";
type Greeting4 = Capitalize<LowercaseGreeting>;
// type Greeting4 = "Hello, world"

/** 3.4 Uncapitalize<StringType> */

// Converts the first character in the string to a lowercase equivalent.

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"

