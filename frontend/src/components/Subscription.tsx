import { useState } from 'react';
import { X } from 'lucide-react';
import { StripeWrapper, PaymentForm } from './payment/StripeIntegration';
import { PaymentMethod } from '@stripe/stripe-js';

interface SubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

const Subscription = ({ isOpen, onClose, onSubscribe }: SubscriptionProps) => {
  const [, setIsProcessing] = useState(false);

  const handleSuccess = (paymentMethod: PaymentMethod) => {
    console.log('Payment successful:', paymentMethod);
    setIsProcessing(false);
    onSubscribe();
  };

  const handleError = (error: any) => {
    console.error('Payment error:', error);
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded-3 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="position-relative p-4">
          <button 
            className="btn btn-sm position-absolute top-0 end-0 mt-2 me-2 text-secondary border-0" 
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-primary rounded-circle p-3 mb-3">
              <span className="text-warning fs-4">👑</span>
            </div>
            <h3 className="fw-bold">Upgrade to Premium</h3>
            <p className="text-muted">Unlock messaging and connect with talents directly</p>
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="text-success me-3">✓</div>
              <div>Direct messaging with talents</div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="text-success me-3">✓</div>
              <div>Unlimited profile views</div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="text-success me-3">✓</div>
              <div>Priority support</div>
            </div>
          </div>
          
          <div className="bg-light p-3 rounded-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h4 className="mb-0 fs-5">Premium Plan</h4>
                <div className="text-muted small">Monthly subscription</div>
              </div>
              <div className="text-end">
                <div className="fs-3 fw-bold">$29.99</div>
                <div className="text-muted small">/month</div>
              </div>
            </div>
            <div className="d-flex align-items-center small text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-check me-2" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              </svg>
              Secure payment via Stripe
            </div>
          </div>
          
          <StripeWrapper>
            <PaymentForm 
              amount={2999} 
              onSuccess={handleSuccess} 
              onError={handleError} 
            />
          </StripeWrapper>
          
          <button 
            className="btn btn-link text-muted w-100" 
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
