// src/components/Subscription.tsx
import React, { useState } from "react";

const Subscription: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    // TODO: Implement API call to handle subscription
    setIsSubscribed(true);
  };

  return (
    <div className="subscription-container">
      <h2>Scout Subscription</h2>
      {isSubscribed ? (
        <p>You are now a premium scout! You can contact talents.</p>
      ) : (
        <button onClick={handleSubscribe}>Subscribe to Premium</button>
      )}
    </div>
  );
};

export default Subscription;
