"use strict";
function hello() {
    const str = "Hello World";
    console.log("hello--------", str);
}
hello();
/*
function greeter(person: string) {
  return "Hello, " + person;
}

let user = [0, 1, 2];
// greeter(user)
 */
class Student {
    fullName;
    firstName;
    lastName;
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
function greeter(person) {
    const str = "Hello, " + person.firstName + " " + person.lastName;
    console.log(str);
    return str;
}
let user = new Student("Jane", "M.", "User");
greeter(user);
document.body.textContent = greeter(user);
