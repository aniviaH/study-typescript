// import { dateTimestamp } from './utils'

export const hello = hello => {
  return hello;
};
var Config;
(function (Config) {
  Config[Config["name"] = 0] = "name";
  Config[Config["ver"] = 1] = "ver";
})(Config || (Config = {}));
const c = Config.ver;
console.log('Hello TypeScript');
console.log(c);
const now = new Date();
// @ts-ignore
const nowTimestamp = dateTimestamp(now);
console.log(nowTimestamp);
export function dateTimestamp(date) {
  return date.getTime();
}
