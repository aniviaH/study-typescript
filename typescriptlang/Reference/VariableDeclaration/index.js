function f(input) {
    let a = 100;
    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    return b;
}
// window.xxxyyy = 'xxxyyy'
// a++; // illegal to use 'a' before it's declared;
// let a;
function foo() {
    // okay to capture 'a'
    return a;
}
foo();
let a = 1;
export {};
