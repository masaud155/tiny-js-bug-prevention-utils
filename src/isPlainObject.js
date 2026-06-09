/**
 * Check whether a value is a plain object.
 * @param {any} value
 * @returns {boolean}
 */
export function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}
