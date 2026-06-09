import { describe, expect, it } from 'vitest';
import { hasOwn } from '../src/hasOwn.js';

describe('hasOwn', () => {
  it('returns true for an own property', () => {
    expect(hasOwn({ a: 1 }, 'a')).toBe(true);
  });

  it('returns false for inherited properties', () => {
    const proto = { a: 1 };
    const obj = Object.create(proto);
    expect(hasOwn(obj, 'a')).toBe(false);
  });

  it('returns false for null or undefined objects', () => {
    expect(hasOwn(null, 'a')).toBe(false);
    expect(hasOwn(undefined, 'a')).toBe(false);
  });
});
