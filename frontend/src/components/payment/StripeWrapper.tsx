import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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

export default StripeWrapper;
