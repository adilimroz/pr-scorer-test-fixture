/**
 * Formats an integer amount in cents into a localized currency string.
 */
export function formatPrice(cents: number, currency = 'USD', locale = 'en-US'): string {
  if (!Number.isFinite(cents)) {
    throw new RangeError('Price must be a finite number');
  }

  const dollars = Math.floor(cents) / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

export function parsePriceToCents(formatted: string): number {
  const normalized = formatted.replace(/[^0-9.-]/g, '');
  const dollars = parseFloat(normalized);

  if (Number.isNaN(dollars)) {
    throw new RangeError('Invalid price format');
  }

  return Math.round(dollars * 100);
}
