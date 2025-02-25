import React, { useState } from 'react';
import { loadStripe, PaymentMethod } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

interface StripeWrapperProps {
  children: React.ReactNode;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentMethod: PaymentMethod) => void;
  onError: (error: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setCardError(error.message || null);
      setIsProcessing(false);
      onError(error.message);
    } else {
      setCardError(null);
      onSuccess(paymentMethod);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement 
        className="form-control p-3 mb-3" 
        onChange={handleCardChange}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      
      {cardError && (
        <div className="alert alert-danger mb-3" role="alert">
          {cardError}
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn btn-primary w-100 py-3" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Processing...
          </>
        ) : `Pay $${amount}`}
      </button>
    </form>
  );
};

export { StripeWrapper, PaymentForm };
