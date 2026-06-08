import { AuthGuard } from './AuthGuard';
import { CartItem, type CartItemData } from './CartItem';
import { formatPrice } from '../utils/formatPrice';

const DEFAULT_CART: CartItemData[] = [
  { id: 'sku-1', name: 'Widget', quantity: 2, unitPriceCents: 1299 },
  { id: 'sku-2', name: 'Gadget', quantity: 1, unitPriceCents: 4599 },
];

interface CheckoutProps {
  items?: CartItemData[];
}

export function Checkout({ items = DEFAULT_CART }: CheckoutProps) {
  const totalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0,
  );

  return (
    <AuthGuard>
      <section className="checkout" data-testid="checkout">
        <h1>Checkout</h1>
        <ul className="cart-list">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
        <p className="checkout-total">
          Order total: <strong>{formatPrice(totalCents)}</strong>
        </p>
      </section>
    </AuthGuard>
  );
}
