/**
 * Wrap a promise with a timeout.
 * @param {Promise<any>} promise
 * @param {number} ms
 * @param {string} [message]
 * @returns {Promise<any>}
 */
export function withTimeout(promise, ms, message = `Operation timed out after ${ms} ms`) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(message));
    }, ms);
  });

  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}
