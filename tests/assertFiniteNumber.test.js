import { describe, expect, it } from 'vitest';
import { assertFiniteNumber } from '../src/assertFiniteNumber.js';

describe('assertFiniteNumber', () => {
  it('returns a finite number', () => {
    expect(assertFiniteNumber(5)).toBe(5);
  });

  it('throws for NaN', () => {
    expect(() => assertFiniteNumber(NaN)).toThrow('value must be a finite number');
  });

  it('throws for Infinity', () => {
    expect(() => assertFiniteNumber(Infinity)).toThrow('value must be a finite number');
  });
});
