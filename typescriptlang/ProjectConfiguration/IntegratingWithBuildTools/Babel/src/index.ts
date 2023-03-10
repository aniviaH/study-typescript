// import { dateTimestamp } from './utils'

export const hello = (hello: string): string => {
  return hello
}

const enum Config {
  name,
  ver
}

const c: Config = Config.ver

console.log('Hello TypeScript');
console.log(c);

const now = new Date()
// @ts-ignore
const nowTimestamp = dateTimestamp(now)
console.log(nowTimestamp);