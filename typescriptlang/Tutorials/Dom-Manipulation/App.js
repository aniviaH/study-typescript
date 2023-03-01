// 1. Select th div element using the id property
var app = document.getElementById('app');
// 2. Create a new <p></p> element programmatically
var p = document.createElement('p');
var frame = document.createElement('frame');
var xyz = document.createElement('xyz');
// 3. Add the text content
p.innerText = 'Hello, World!';
xyz.innerText = 'xyz';
// 4. Append the p element to the div element
var res1 = app === null || app === void 0 ? void 0 : app.appendChild(p);
var res2 = app === null || app === void 0 ? void 0 : app.appendChild(xyz);
console.log(document.getElementsByTagName('xyz')[0].innerHTML);
// children & chilNodes
var parentDiv = document.getElementsByClassName('parent')[0];
var children = parentDiv.children;
var childNodes = parentDiv.childNodes;
console.log(children);
console.log(childNodes);
console.log(children.item(0));
console.log(childNodes.item(0));
for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
    var child = children_1[_i];
    console.log('child: ', child);
}
for (var _a = 0, childNodes_1 = childNodes; _a < childNodes_1.length; _a++) {
    var childNode = childNodes_1[_a];
    console.log('childNode: ', childNode);
}
// querySelector querySelectorAll
var firstLi = document.querySelector('li');
var allLi = document.querySelectorAll('li');
console.log(firstLi);
console.log(allLi);
