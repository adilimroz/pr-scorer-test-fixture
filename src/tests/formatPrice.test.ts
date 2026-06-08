import { describe, expect, it } from 'vitest';
import { formatPrice, parsePriceToCents } from '../utils/formatPrice';

describe('formatPrice', () => {
  it('formats zero cents', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats whole dollar amounts', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });

  it('formats amounts with cents', () => {
    expect(formatPrice(1299)).toBe('$12.99');
  });

  it('formats large amounts with grouping separators', () => {
    expect(formatPrice(1234567)).toBe('$12,345.67');
  });

  it('supports alternate currencies', () => {
    expect(formatPrice(500, 'EUR', 'de-DE')).toMatch(/5,00\s€/);
  });

  it('throws for non-finite values', () => {
    expect(() => formatPrice(Number.NaN)).toThrow(RangeError);
    expect(() => formatPrice(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});

describe('parsePriceToCents', () => {
  it('parses formatted USD strings', () => {
    expect(parsePriceToCents('$12.99')).toBe(1299);
  });

  it('throws for invalid input', () => {
    expect(() => parsePriceToCents('not-a-price')).toThrow(RangeError);
  });
});
