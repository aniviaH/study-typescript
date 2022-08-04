export function log(x) {
    console.log(x);
}
log(123);
const obj = {
    1: "red",
    2: "green",
    3: "yellow",
};
const test1 = (type) => {
    console.log(obj[type]);
};
test1(1);
const test2 = (type) => {
    console.log(type);
};
test2({
    1: 'a',
    2: 'b',
    3: 'c',
});
//# sourceMappingURL=hello.js.map