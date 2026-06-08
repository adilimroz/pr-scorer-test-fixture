import { formatPrice } from '../utils/formatPrice';

interface PriceDisplayProps {
  cents: number;
  currency?: string;
  label?: string;
}

export function PriceDisplay({ cents, currency = 'USD', label }: PriceDisplayProps) {
  const formatted = formatPrice(cents, currency);

  return (
    <span className="price-display" data-testid="price-display">
      {label ? `${label}: ` : ''}
      {formatted}
    </span>
  );
}
