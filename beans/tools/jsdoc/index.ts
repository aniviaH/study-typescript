/**
 * add two item. if c exist, also add c
 *
 * ```js
 * // add two item
 * copyFile('1', '2');
 *
 * // add three item
 * add('3', '4', 5);
 * ```
 * @since v0.0.1
 * @param a item a
 * @param b item b
 * @param [c=0] item c
 */
export function add(a: number, b: number): number;
export function add(a: number, b: number, c?: string): number;
export function add (a: number, b: number, c?: string): string | number {
  // if (c) {
  //   return a + b + c
  // }
  return a + b + c
}

const add1 = add(1, 2)

const add2 = add(1, 2, '3')

