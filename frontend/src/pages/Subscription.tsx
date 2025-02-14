import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("your-publishable-key-here");

const Subscription: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/subscribe");
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
      console.error("Subscription error", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Subscribe to Premium</h2>
      <p>Unlock the ability to contact talents by subscribing for just $1.</p>
      <button onClick={handleSubscription} disabled={isLoading}>
        {isLoading ? "Processing..." : "Subscribe Now"}
      </button>
    </div>
  );
};

export default Subscription;
