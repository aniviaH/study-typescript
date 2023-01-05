function noImplicitAny(p1) {
    console.log(p1);
}
noImplicitAny(null);
function strictNullChecks() {
    let str = 'hello';
    str = null;
}
strictNullChecks();
