var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function reportableClassDecorator(constructor) {
    return class extends constructor {
        reportingURL = "http://www...";
    };
}
let BugReport2 = class BugReport2 {
    type = "report";
    title;
    constructor(t) {
        this.title = t;
    }
};
BugReport2 = __decorate([
    reportableClassDecorator
], BugReport2);
const bug = new BugReport2("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
console.log(bug.reportingURL);
export {};
