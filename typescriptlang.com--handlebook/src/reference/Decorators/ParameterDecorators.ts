import "reflect-metadata";

const requiredMetadataKey = Symbol("required");
 
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  
  console.log('existingRequiredParameters: ', existingRequiredParameters);
  existingRequiredParameters.push(parameterIndex);
  console.log('existingRequiredParameters: ', existingRequiredParameters);

  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value!;
 
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    console.log('requiredParameters: ', requiredParameters);
    console.log('arguments: ', arguments);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, arguments);
  };
}

class BugReport3 {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
 
  @validate
  print(@required verbose: boolean) {
    console.log('print: ', verbose);
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
     return this.title; 
    }
  }
}

const bug = new BugReport3('bug')
// bug.print(1, 2, 3) // 运行时调用能通过
// bug.print() // 运行是调用报错 Error: Missing required argument.

bug.print(true)


// tsc ./ParameterDecorators.ts --module esnext --target esnext --emitDecoratorMetadata true --experimentalDecorators true
// ts-node .\ParameterDecorators.js