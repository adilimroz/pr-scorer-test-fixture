import { PriceDisplay } from './PriceDisplay';

export interface CartItemData {
  id: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
}

interface CartItemProps {
  item: CartItemData;
}

export function CartItem({ item }: CartItemProps) {
  const lineTotalCents = item.unitPriceCents * item.quantity;

  return (
    <li className="cart-item" data-testid={`cart-item-${item.id}`}>
      <span className="cart-item-name">{item.name}</span>
      <span className="cart-item-qty">x{item.quantity}</span>
      <PriceDisplay cents={lineTotalCents} label="Total" />
    </li>
  );
}
