// 1. Select th div element using the id property
const app = document.getElementById('app')

// 2. Create a new <p></p> element programmatically
const p = document.createElement('p')
const frame = document.createElement('frame')
const xyz = document.createElement('xyz')

// 3. Add the text content
p.innerText = 'Hello, World!'

xyz.innerText = 'xyz'

// 4. Append the p element to the div element
const res1 = app?.appendChild(p)
const res2 = app?.appendChild(xyz)

console.log(document.getElementsByTagName('xyz')[0].innerHTML)


// children & chilNodes
const parentDiv = document.getElementsByClassName('parent')[0]

const children = parentDiv.children
const childNodes = parentDiv.childNodes
console.log(children);
console.log(childNodes);
console.log(children.item(0));
console.log(childNodes.item(0));


for (let child of children) {
  console.log('child: ', child);
}

for (let childNode of childNodes) {
  console.log('childNode: ', childNode);
}


// querySelector querySelectorAll
const firstLi = document.querySelector('li')
const allLi = document.querySelectorAll('li')
console.log(firstLi);
console.log(allLi);
