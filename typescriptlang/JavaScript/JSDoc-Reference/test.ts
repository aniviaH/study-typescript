type Box<T> = {t: T}

/**
 * @returns A {@link Box} containing the parameter
 */
function box<U> (u: U): Box<U> {
  return {t: u}
}
const res = box('a')