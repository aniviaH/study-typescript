function hello(): void {
  const str: string = "Hello World";
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
  fullName: string;
  firstName: string;
  lastName: string;
  constructor(
     firstName: string,
     middleInitial: string,
     lastName: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

const p: {person: Person, a: number;} = {person: {
  firstName: 'a',
  lastName: 'b'
}, a: 30}

function greeter({ person }: { person: Person; age: number;}) {
  const str = "Hello, " + person.firstName + " " + person.lastName
  console.log(str);
  return str
}

let user = new Student("Jane", "M.", "User");

greeter({ person: user, age: 1 });

document.body.textContent = greeter({ person: user, age: 30 });
