// @ts-check

/**
 * 
 * @param {Object} options 
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=43]
 * @returns {number}
 */
function special(options) {
  return (options.prop4 || 1001) + (options.prop5 || 0)
}

const res = special({
  prop1: '1',
  prop2: 2
})
console.log('res--', res);

