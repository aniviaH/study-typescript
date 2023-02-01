var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed2(constructor) {
    constructor.prototype.a = 'a';
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
let BugReport = class BugReport {
    type = "report";
    title = 'title';
    constructor(t) {
        this.title = t;
    }
};
BugReport = __decorate([
    sealed2
], BugReport);
// When @sealed is executed, it will seal both the constructor and its prototype, and will therefore prevent any further functionality from being added to or removed from this class during runtime by accessing BugReport.prototype or by defining properties on BugReport itself (note that ES2015 classes are really just syntactic sugar to prototype-based constructor functions). This decorator does not prevent classes from sub-classing BugReport.
const bug = new BugReport('title');
console.log(bug.type);
delete bug.type;
console.log(bug.type);
console.log(bug.a);
