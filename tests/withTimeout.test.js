import { describe, expect, it } from 'vitest';
import { withTimeout } from '../src/withTimeout.js';

describe('withTimeout', () => {
  it('resolves when the promise completes before the timeout', async () => {
    const result = await withTimeout(Promise.resolve('ok'), 100);
    expect(result).toBe('ok');
  });

  it('rejects when the timeout is reached first', async () => {
    await expect(withTimeout(new Promise(() => {}), 10)).rejects.toThrow('Operation timed out');
  });
});
