import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const PaymentForm = ({ amount }) => {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/payment', { method: 'POST', body: JSON.stringify({ amount }) });
    const session = await response.json();
    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <button onClick={handlePayment} className="bg-primary text-white p-2 rounded">
      Pay ${amount}
    </button>
  );
};

export default PaymentForm;
