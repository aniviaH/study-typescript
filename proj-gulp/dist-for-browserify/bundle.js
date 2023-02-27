(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
function sayHello(name) {
    debugger;
    return "Hello from ".concat(name);
}
exports.sayHello = sayHello;
},{}],2:[function(require,module,exports){
"use strict";
// function hello (compiler: string) {
//   console.log(`Hello from ${compiler}`);
// }
// hello("TypeScript");
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
// console.log(sayHello('TypeScript'));
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerHTML = (0, greet_1.sayHello)(name);
}
showHello('greeting', 'TypeScript--111');
},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ3JlZXQudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBLFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ25DLFFBQVEsQ0FBQTtJQUNSLE9BQU8scUJBQWMsSUFBSSxDQUFFLENBQUE7QUFDN0IsQ0FBQztBQUhELDRCQUdDOzs7QUNIRCxzQ0FBc0M7QUFDdEMsMkNBQTJDO0FBQzNDLElBQUk7QUFDSix1QkFBdUI7O0FBRXZCLGlDQUFrQztBQUNsQyx1Q0FBdUM7QUFFdkMsU0FBUyxTQUFTLENBQUMsT0FBZSxFQUFFLElBQVk7SUFDOUMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1QyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTtBQUNoQyxDQUFDO0FBRUQsU0FBUyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKG5hbWU6IHN0cmluZykge1xyXG4gIGRlYnVnZ2VyXHJcbiAgcmV0dXJuIGBIZWxsbyBmcm9tICR7bmFtZX1gXHJcbn1cclxuIiwiLy8gZnVuY3Rpb24gaGVsbG8gKGNvbXBpbGVyOiBzdHJpbmcpIHtcclxuLy8gICBjb25zb2xlLmxvZyhgSGVsbG8gZnJvbSAke2NvbXBpbGVyfWApO1xyXG4vLyB9XHJcbi8vIGhlbGxvKFwiVHlwZVNjcmlwdFwiKTtcclxuXHJcbmltcG9ydCB7IHNheUhlbGxvIH0gZnJvbSAnLi9ncmVldCdcclxuLy8gY29uc29sZS5sb2coc2F5SGVsbG8oJ1R5cGVTY3JpcHQnKSk7XHJcblxyXG5mdW5jdGlvbiBzaG93SGVsbG8oZGl2TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICBjb25zdCBlbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKVxyXG4gIGVsdC5pbm5lckhUTUwgPSBzYXlIZWxsbyhuYW1lKVxyXG59XHJcblxyXG5zaG93SGVsbG8oJ2dyZWV0aW5nJywgJ1R5cGVTY3JpcHQtLTExMScpXHJcbiJdfQ==
