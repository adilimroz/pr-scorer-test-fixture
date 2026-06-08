import { RouteObject } from 'react-router-dom';
import { Checkout } from './components/Checkout';
import { PaymentForm } from './components/PaymentForm';

export const routes: RouteObject[] = [
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/payment',
    element: <PaymentForm amountCents={7197} />,
  },
  {
    path: '/',
    element: (
      <main>
        <h1>PR Scorer Test Fixture</h1>
        <nav>
          <a href="/checkout">Checkout</a> | <a href="/payment">Payment</a>
        </nav>
      </main>
    ),
  },
];
