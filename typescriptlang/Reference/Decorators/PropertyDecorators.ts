import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  console.log(`formatString: ${formatString}`);

  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  console.log(`target: ${target}`);
  console.log(`propertyKey: ${propertyKey}`);

  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter2 {
  @format("Hello, %s")
  greeting: string;
  @format("World, %s")
  greeting2: string = '';
  constructor(message: string) {
    this.greeting = message;
    this.greeting2 = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting2");
    console.log(`formatString: ${formatString}`);
    
    return formatString.replace("%s", this.greeting2);
  }
}

const g = new Greeter2('test')

console.log(g.greet()); // Hello, test
console.log(g.greeting); // test
