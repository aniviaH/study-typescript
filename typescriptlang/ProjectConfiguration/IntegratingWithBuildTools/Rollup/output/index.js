function dateTimestamp(date) {
    return date.getTime();
}

var hello = function (hello) {
    return hello;
};
var c = 1 /* Config.ver */;
console.log('Hello TypeScript');
console.log(c);
var now = new Date();
// @ts-ignore
var nowTimestamp = dateTimestamp(now);
console.log(nowTimestamp);

export { hello };
