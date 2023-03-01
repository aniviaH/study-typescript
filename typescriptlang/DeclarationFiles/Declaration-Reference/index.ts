export {}

let result = myLib.makeGreeting("hello, world");
console.log("The computed greeting is:" + result);
let count = myLib.numberOfGreetings;

declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

let x: Widget = getWidget(43)
let arr: Widget[] = getWidget("all of them")

declare type Widget = {}
declare function getWidget(num: number): Widget
declare function getWidget(str: string): Widget[]

greet({
  greeting: 'hello world',
  duration: 4000
})

interface GreetingSettings {
  greeting: string
  duration?: number
  color?: string
}
declare function greet (setting: GreetingSettings): void

function getGreeting () {
  return 'howdy'
}

class Greeter {
  constructor (s?: string) {

  }

  public log (opt: GreetingLib.Options.Log) {

  }
  public alert(opt: GreetingLib.Options.Alert) {
    
  }
}
class MyGreeter extends Greeter {}

greet("hello")
greet(getGreeting)
greet(new MyGreeter())

type GreetingLike = string | (() => string) | MyGreeter
declare function greet (g: GreetingLike): void


const g = new Greeter("hello")
g.log({ verbose: true })
g.alert({ modal: false, title: 'Current Greeting' })

declare namespace GreetingLib {
  interface LogOptions {
    verbose: boolean
  }
  interface AlertOptions {
    modal: boolean
    title: string
  }
}

declare namespace GreetingLib.Options {
  interface Log {
    verbose: boolean
  }
  interface Alert {
    modal: boolean,
    title: string
  }
}

const myGreeter = new Greeter2('hello, world')
myGreeter.greeting = 'howdy'
myGreeter.showGreeting()

class SpecialGreeter extends MyGreeter {
  constructor () {
    super('Very special greetings')
  }
}

declare class Greeter2 {
  constructor(greeting: string)
  greeting: string
  showGreeting(): void
}


console.log('Half the number of widgets is ' + foo / 2)

declare var foo: number

greet3("hello, world!")
declare function greet3(greeting: string): void
