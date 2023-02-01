function sealed2(constructor: Function) {
  constructor.prototype.a = 'a'
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed2
class BugReport {
  type?: string = "report";
  title?: string = 'title';
 
  constructor(t: string) {
    this.title = t;
  }
}


// When @sealed is executed, it will seal both the constructor and its prototype, and will therefore prevent any further functionality from being added to or removed from this class during runtime by accessing BugReport.prototype or by defining properties on BugReport itself (note that ES2015 classes are really just syntactic sugar to prototype-based constructor functions). This decorator does not prevent classes from sub-classing BugReport.
const bug = new BugReport('title')
console.log(bug.type);
delete bug.type
console.log(bug.type);

// console.log(bug.a);