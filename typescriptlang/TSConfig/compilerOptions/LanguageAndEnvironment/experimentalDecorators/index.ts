export {}

function LogMethod (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);
}

class Demo {
  @LogMethod
  foo () {
    // do nothing
  }
}

const demo = new Demo()
