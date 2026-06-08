export interface PaymentRequest {
  amountCents: number;
  cardLastFour: string;
  currency: string;
}

export interface PaymentResult {
  transactionId: string;
  status: 'authorized' | 'declined';
  authorizedAt: string;
}

const MAX_RETRIES = 2;

function simulateGatewayFailure(cardLastFour: string): boolean {
  return cardLastFour.endsWith('00');
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function authorizePayment(request: PaymentRequest): Promise<PaymentResult> {
  if (request.amountCents <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  if (!/^\d{4}$/.test(request.cardLastFour)) {
    throw new Error('Invalid card number');
  }

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= MAX_RETRIES) {
    try {
      await delay(50);

      if (simulateGatewayFailure(request.cardLastFour) && attempt < MAX_RETRIES) {
        throw new Error('Gateway timeout');
      }

      if (simulateGatewayFailure(request.cardLastFour)) {
        return {
          transactionId: `txn_declined_${Date.now()}`,
          status: 'declined',
          authorizedAt: new Date().toISOString(),
        };
      }

      return {
        transactionId: `txn_${Date.now()}`,
        status: 'authorized',
        authorizedAt: new Date().toISOString(),
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error('Unknown payment error');
      attempt += 1;
    }
  }

  throw lastError ?? new Error('Payment authorization failed after retries');
}
