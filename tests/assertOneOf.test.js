import { describe, expect, it } from 'vitest';
import { assertOneOf } from '../src/assertOneOf.js';

describe('assertOneOf', () => {
  it('returns the value when it is included', () => {
    expect(assertOneOf('blue', ['red', 'blue'])).toBe('blue');
  });

  it('throws when the value is not included', () => {
    expect(() => assertOneOf('green', ['red', 'blue'])).toThrow('value must be one of: red, blue');
  });

  it('throws when options is empty', () => {
    expect(() => assertOneOf('x', [])).toThrow('options must be a non-empty array');
  });
});
