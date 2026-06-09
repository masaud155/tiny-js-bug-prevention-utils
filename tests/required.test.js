import { describe, expect, it } from 'vitest';
import { required } from '../src/required.js';

describe('required', () => {
  it('returns the value when it is present', () => {
    expect(required('hello')).toBe('hello');
  });

  it('throws when the value is null', () => {
    expect(() => required(null)).toThrow('value is required');
  });

  it('throws when the value is undefined', () => {
    expect(() => required(undefined)).toThrow('value is required');
  });
});
