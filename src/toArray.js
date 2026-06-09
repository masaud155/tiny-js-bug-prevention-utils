/**
 * Normalize a value into a safe array.
 * @param {any} value
 * @returns {Array<any>}
 */
export function toArray(value) {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
