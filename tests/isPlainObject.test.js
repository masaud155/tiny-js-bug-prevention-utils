import { describe, expect, it } from 'vitest';
import { isPlainObject } from '../src/isPlainObject.js';

describe('isPlainObject', () => {
  it('returns true for a plain object', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('returns false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('returns false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });
});
