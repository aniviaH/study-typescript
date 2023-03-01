var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "reflect-metadata";
const formatMetadataKey = Symbol("format");
function format(formatString) {
    console.log(`formatString: ${formatString}`);
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target, propertyKey) {
    console.log(`target: ${target}`);
    console.log(`propertyKey: ${propertyKey}`);
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
class Greeter2 {
    greeting;
    greeting2 = '';
    constructor(message) {
        this.greeting = message;
        this.greeting2 = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting2");
        console.log(`formatString: ${formatString}`);
        return formatString.replace("%s", this.greeting2);
    }
}
__decorate([
    format("Hello, %s")
], Greeter2.prototype, "greeting", void 0);
__decorate([
    format("World, %s")
], Greeter2.prototype, "greeting2", void 0);
const g = new Greeter2('test');
console.log(g.greet()); // Hello, test
console.log(g.greeting); // test
