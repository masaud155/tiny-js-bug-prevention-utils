/**
 * Safely parse JSON and return a fallback on failure.
 * @param {unknown} value
 * @param {any} [fallback=null]
 * @returns {any}
 */
export function safeJsonParse(value, fallback = null) {
  if (typeof value !== 'string') {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}
