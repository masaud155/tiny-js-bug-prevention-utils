/**
 * Assert that a value is a real finite number.
 * @param {any} value
 * @param {string} [name='value']
 * @returns {number}
 * @throws {Error} When the value is not a finite number.
 */
export function assertFiniteNumber(value, name = 'value') {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  return value;
}
