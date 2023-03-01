function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");

    console.log(`target: ${target}, propertyKey: ${propertyKey}, descriptor: ${descriptor}`);
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");

    console.log(`target: ${target}, propertyKey: ${propertyKey}, descriptor: ${descriptor}`);
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {
    return {
      a: 1
    }
  }
}