!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports=React},function(t,e){t.exports=ReactDOM},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(1);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}function f(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){var n;return u(this,e),(n=f(this,s(e).call(this,t))).state=n.getInitState(),n}return p(e,t),l(e,[{key:"getInitState",value:function(){return{cells:Array.apply(null,Array(9)).map((function(){return""})),gameState:""}}},{key:"resetState",value:function(){this.setState(this.getInitState())}},{key:"componentDidMount",value:function(){var t=this;window.addEventListener("restart",(function(){return t.resetState()}))}},{key:"componentWillUnmount",value:function(){var t=this;window.removeEventListener("restart",(function(){return t.resetState()}))}},{key:"handleGameStateChange",value:function(t){var e=new CustomEvent("gameStateChange",{detail:this.state.gameState});e.initEvent("gameStateChange",!1,!0),window.dispatchEvent(e)}},{key:"checkGameState",value:function(t,e,n){if(""!==this.state.gameState)return this.state.gameState;var r=this.check3Cells(t,3*Math.floor(e/3),3*Math.floor(e/3)+1,3*Math.floor(e/3)+2);return r||((r=this.check3Cells(t,e%3,e%3+3,e%3+6))?r:(r=this.check3Cells(t,0,4,8))?r:(r=this.check3Cells(t,2,4,6))||(0===this.findAllEmptyCells(t).length?"Draw":""))}},{key:"check3Cells",value:function(t,e,n,r){return t[e]===t[n]&&t[n]===t[r]&&""!==t[e]?"X"===t[e]?"X Wins!":"O Wins!":void 0}},{key:"findAllEmptyCells",value:function(t){return t.map((function(t,e){return""===t?e:-1})).filter((function(t){return-1!==t}))}},{key:"move",value:function(t,e,n){var r=this;if(""===this.state.gameState&&""===this.state.cells[t]){var o=this.state.cells.slice();o[t]=e;var a=this.state.gameState;this.setState({cells:o,gameState:this.checkGameState(o,t,e)},(function(){r.state.gameState!==a&&r.handleGameStateChange(r.state.gameState),n&&n.call(r)}))}}},{key:"handleNewPlayerMove",value:function(t){var e=this;this.move(t,"X",(function(){var t=e.findAllEmptyCells(e.state.cells),n=t[Math.floor(Math.random()*t.length)];e.move(n,"O")}))}},{key:"render",value:function(){var t=this,e=this.state.cells.map((function(e,n){return o.a.createElement(m,{key:n,pos:n,val:e,handleMove:function(){return t.handleNewPlayerMove(n)}})}));return o.a.createElement("div",{className:"board"},e)}}]),e}(o.a.Component),m=function(t){function e(){return u(this,e),f(this,s(e).apply(this,arguments))}return p(e,t),l(e,[{key:"posToClassName",value:function(t){var e="cell";switch(Math.floor(t/3)){case 0:e+=" top";break;case 2:e+=" bottom"}switch(t%3){case 0:e+=" left";break;case 2:e+=" right"}return e}},{key:"handleClick",value:function(t){this.props.handleMove()}},{key:"render",value:function(){var t=this,e=this.props.val;return""===this.props.val&&(e=""),o.a.createElement("div",{className:this.posToClassName(this.props.pos),onClick:function(e){return t.handleClick(e)}},o.a.createElement("div",{className:e}," ",this.props.val," "))}}]),e}(o.a.Component);function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function S(t,e){return!e||"object"!==b(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t,e){return(w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var O=function(t){function e(){return v(this,e),S(this,g(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(e,t),n=e,(r=[{key:"handleClick",value:function(t){var e=document.createEvent("Event");e.initEvent("restart",!1,!0),window.dispatchEvent(e)}},{key:"render",value:function(){var t=this;return o.a.createElement("a",{href:"#",className:"restartBtn",onClick:function(e){return t.handleClick(e)}},"Restart")}}])&&d(n.prototype,r),a&&d(n,a),e}(o.a.Component);function E(t){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _(t,e){return!e||"object"!==E(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function j(t){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function C(t,e){return(C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var P=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=_(this,j(e).call(this,t))).state={gameState:""},n}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}(e,t),n=e,(r=[{key:"handleGameStateChange",value:function(t){this.setState({gameState:t.detail})}},{key:"handleRestart",value:function(t){this.setState({gameState:""})}},{key:"componentDidMount",value:function(){var t=this;window.addEventListener("gameStateChange",(function(e){return t.handleGameStateChange(e)})),window.addEventListener("restart",(function(e){return t.handleRestart(e)}))}},{key:"componentWillUnmount",value:function(){var t=this;window.removeEventListener("gameStateChange",(function(e){return t.handleGameStateChange(e)})),window.removeEventListener("restart",(function(e){return t.handleRestart(e)}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"gameStateBar"}," ",this.state.gameState," ")}}])&&k(n.prototype,r),a&&k(n,a),e}(o.a.Component);function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function N(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,e){return!e||"object"!==M(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function R(t){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function G(t,e){return(G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var L=function(t){function e(){return N(this,e),x(this,R(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&G(t,e)}(e,t),n=e,(r=[{key:"render",value:function(){return o.a.createElement("div",{className:"app"},o.a.createElement(h,null),o.a.createElement("div",null,o.a.createElement("span",{className:"description t1"}," Player(X) "),o.a.createElement("span",{className:"description t2"}," Computer(O) ")),o.a.createElement(O,null),o.a.createElement(P,null))}}])&&T(n.prototype,r),a&&T(n,a),e}(o.a.Component);Object(a.render)(o.a.createElement(L,null),document.getElementById("content"))}]);