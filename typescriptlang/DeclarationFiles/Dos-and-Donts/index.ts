export {}

interface Fetcher {
  getObject(done: (data: unknown, elapsedTime: number) => void): void;
}

const fetcher: Fetcher = {
  getObject(done: (data: unknown, elapsedTime: number) => void) {
    done('a', 1)
  }
}
fetcher.getObject((data) => {
  console.log('done---start')
  console.log(data)
  console.log('done---end')
})

type DoneFn = () => void
function beforeAll(action: () => void, timeout?: number): void;
function beforeAll(
  action: (done?: DoneFn) => void,
  timeout?: number
): void;
// 上面函数重载可以去掉!!!
function beforeAll(action: (done?: DoneFn) => void, timeout?: number) {
  action(function () {
    console.log('done---')
  })
}

function action1 () {
  console.log('action1---')
}
function action2 (done?: DoneFn) {
  console.log('action2---');
  done && done()
}

beforeAll(action2, 2000)
beforeAll(action1, 2000)

/* WRONG */
// declare function fn(x: unknown): unknown;
// declare function fn(x: HTMLElement): number;
// declare function fn(x: HTMLDivElement): string;
// var myElem: HTMLDivElement;
// var x = fn(myElem); // x: unknown, wat?

/* OK */
function fn(x: HTMLDivElement): string;
function fn(x: HTMLElement): number;
function fn(x: unknown): unknown;
function fn(x: any): any {
  console.log('fn---', x);
}
// var myElem: HTMLDivElement = document.getElementById('div') as HTMLDivElement;
// var x = fn(myElem); // x: string, :)


/* WRONG */
interface Example {
  // diff(one: string): number;
  // diff(one: string, two: string): number;
  // diff(one: string, two: string, three: boolean): number;

  diff(one: string, two?: string, three?: boolean): void;
}
function fn2(x: (a: string, b: number, c: number) => void) {
  console.log('fn2---');
  x('1', 2, 3)
}
var x2: Example = {
  diff(one: string, two?: string, three?: boolean): number {
    console.log('diff---', one)
    return 1
  }
};
// When written with overloads, OK -- used first overload
// When written with optionals, correctly an error
// fn2(x2.diff);

// When written with overloads, incorrectly an error because of passing 'undefined' to 'string'
// When written with optionals, correctly OK
x2.diff("something", true ? undefined : "hour");

/* WRONG */
// interface Moment {
//   utcOffset(): number;
//   utcOffset(b: number): Moment;
//   utcOffset(b: string): Moment;
// }

/* OK */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}

function moment(): Moment {
  return {} as Moment
}

function fn3(x: string): void;
function fn3(x: number): void;
function fn3(x: number | string) {
  // When written with separate overloads, incorrectly an error
  // When written with union types, correctly OK
  return moment().utcOffset(x);
}
