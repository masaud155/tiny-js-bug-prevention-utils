/**
 * Safely check whether an object owns a property.
 * @param {any} object
 * @param {string|symbol} key
 * @returns {boolean}
 */
export function hasOwn(object, key) {
  if (object === null || object === undefined) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(object, key);
}
