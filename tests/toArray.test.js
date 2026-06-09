import { describe, expect, it } from 'vitest';
import { toArray } from '../src/toArray.js';

describe('toArray', () => {
  it('returns an empty array for null', () => {
    expect(toArray(null)).toEqual([]);
  });

  it('returns an empty array for undefined', () => {
    expect(toArray(undefined)).toEqual([]);
  });

  it('wraps a single value in an array', () => {
    expect(toArray('hello')).toEqual(['hello']);
  });

  it('returns the original array', () => {
    const value = [1, 2, 3];
    expect(toArray(value)).toBe(value);
  });
});
