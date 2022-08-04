function log(x: number) {
  console.log(x);
}

log(123);

const obj = {
  1: "red",
  2: "green",
  3: "yellow",
};

type ObjType = {
	1: string,
	2: string,
	3: string,
}

type ObjKeyType = keyof typeof obj

const test1 = (type: ObjKeyType) => {
	console.log(obj[type])
}
test1(1)

const test2 = (type: ObjType) => {
	console.log(type)
}
test2({
	1: 'a',
	2: 'b',
	3: 'c',
})