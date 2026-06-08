import { useState } from 'react';
import { AuthGuard } from './AuthGuard';
import { authorizePayment, type PaymentRequest } from '../api/payments';

interface PaymentFormProps {
  amountCents: number;
  onSuccess?: (transactionId: string) => void;
}

export function PaymentForm({ amountCents, onSuccess }: PaymentFormProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('processing');
    setError(null);

    const formData = new FormData(event.currentTarget);
    const request: PaymentRequest = {
      amountCents,
      cardLastFour: String(formData.get('cardLastFour') ?? ''),
      currency: 'USD',
    };

    try {
      const result = await authorizePayment(request);
      setStatus('success');
      onSuccess?.(result.transactionId);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Payment failed');
    }
  }

  return (
    <AuthGuard>
      <form className="payment-form" data-testid="payment-form" onSubmit={handleSubmit}>
        <h1>Payment</h1>
        <label>
          Card last four digits
          <input name="cardLastFour" maxLength={4} required pattern="\d{4}" />
        </label>
        <button type="submit" disabled={status === 'processing'}>
          {status === 'processing' ? 'Processing…' : `Pay $${(amountCents / 100).toFixed(2)}`}
        </button>
        {error && <p className="payment-error">{error}</p>}
        {status === 'success' && <p className="payment-success">Payment authorized.</p>}
      </form>
    </AuthGuard>
  );
}
