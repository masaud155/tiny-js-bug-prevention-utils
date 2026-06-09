import {
  required,
  isPlainObject,
  hasOwn,
  toArray,
  safeJsonParse,
  assertFiniteNumber,
  withTimeout,
  assertOneOf,
} from '../src/index.js';

const input = { name: 'Alice' };
console.log(required(input, 'input'));
console.log(isPlainObject(input));
console.log(hasOwn(input, 'name'));
console.log(toArray('single')); // ["single"]
console.log(safeJsonParse('{"ok":true}', {}));
console.log(assertFiniteNumber(42));

withTimeout(new Promise((resolve) => setTimeout(() => resolve('done'), 100)), 200)
  .then(console.log)
  .catch(console.error);

console.log(assertOneOf('green', ['red', 'green', 'blue']));
