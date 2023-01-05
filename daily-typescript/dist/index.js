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
greeter(user)
 */
/* interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user); */
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
const u = { person: {
        firstName: 'a',
        lastName: 'b'
    }, a: 30 };
function greeter({ person }) {
    const str = "Hello, " + person.firstName + " " + person.lastName;
    console.log(str);
    return str;
}
let user = new Student("Jane", "M.", "User");
greeter({ person: user, age: 1 });
document.body.textContent = greeter({ person: user, age: 30 });
