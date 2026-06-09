import { describe, expect, it } from 'vitest';
import { safeJsonParse } from '../src/safeJsonParse.js';

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse('{"foo": 1}', {})).toEqual({ foo: 1 });
  });

  it('returns the fallback for invalid JSON', () => {
    expect(safeJsonParse('not json', { ok: false })).toEqual({ ok: false });
  });

  it('returns fallback for non-string values', () => {
    expect(safeJsonParse(42, 'fallback')).toBe('fallback');
  });
});
