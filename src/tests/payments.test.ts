import { describe, expect, it } from 'vitest';
import { authorizePayment } from '../api/payments';

describe('authorizePayment', () => {
  it('throws "Card declined by issuer" for cards ending in 00 instead of returning declined status', async () => {
    try {
      const result = await authorizePayment({
        amountCents: 5000,
        cardLastFour: '1200',
        currency: 'USD',
      });

      expect.fail(`Expected throw but received PaymentResult: ${JSON.stringify(result)}`);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Card declined by issuer');
    }
  });
});
