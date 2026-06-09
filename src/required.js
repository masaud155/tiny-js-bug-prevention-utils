/**
 * Ensure a value is not null or undefined.
 * @param {any} value
 * @param {string} [name='value']
 * @returns {any}
 * @throws {Error} When the value is null or undefined.
 */
export function required(value, name = 'value') {
  if (value === null || value === undefined) {
    throw new Error(`${name} is required`);
  }
  return value;
}
