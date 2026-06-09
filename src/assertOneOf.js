/**
 * Assert a value is one of a known list of allowed values.
 * @param {any} value
 * @param {Array<any>} options
 * @param {string} [name='value']
 * @returns {any}
 * @throws {Error} When the value is not included in options.
 */
export function assertOneOf(value, options, name = 'value') {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error('options must be a non-empty array');
  }

  if (!options.includes(value)) {
    throw new Error(`${name} must be one of: ${options.join(', ')}`);
  }

  return value;
}
