import { helloWorld } from 'baseUrl/hello/world';
helloWorld();
function foo(param) {
    console.log("foo---", param);
}
function fn(n) {
    if (n > 5) {
        return true;
    }
    else {
        return false;
    }
}
function verifyAge(age) {
    if (age > 18) {
    }
}
const settings = getUserSettings();
settings.colorThemeOverride = "dark";
settings.colorThemeOverride = "light";
settings.colorThemeOverride = undefined;
const a = 6;
switch (a) {
    case 0:
        console.log("even");
        break;
    case 1:
        console.log("odd");
        break;
}
class Album {
    setup() {
    }
}
class MLAlbum extends Album {
    setup() {
    }
}
class SharedAlbum extends Album {
    download() {
    }
    setup() { }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getAreaFunction() {
        return this.width * this.height;
    }
}
const settings2 = getSettings();
settings2.speed;
settings2.quality;
settings2["username"];
const sysName = env.NAME;
const os = env.OS;
const nodeEnv = env["NODE_ENV"];
function fn2(x) {
    return parseInt(x);
}
const n1 = fn2.call(undefined, "10");
function fn3(x) {
    console.log("Hello, " + x.toLowerCase());
}
const users = [
    { name: "Oby", age: 12 },
    { name: "Heera", age: 32 },
];
const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser ? loggedInUser.age : "");
class UserAccount {
    constructor(name) {
        this.accountType = "user";
        this.name = name;
    }
}
try {
}
catch (err) {
    if (err instanceof Error) {
        console.log(err.message);
    }
}
//# sourceMappingURL=a.js.map