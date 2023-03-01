// Keep in mind that string enum members do not get a reverse mapping generated at all.
var StringEnum;
(function (StringEnum) {
    StringEnum["Foo"] = "foo";
    StringEnum["Bar"] = "bar";
})(StringEnum || (StringEnum = {}));
const foo = StringEnum.Foo;
const nameOfFoo = StringEnum[foo];
// Property 'foo' does not exist on type 'typeof StringEnum'. Did you mean 'Foo'?
console.log('foo: ', foo);
console.log('nameOfFoo: ', nameOfFoo); // undefined
export {};