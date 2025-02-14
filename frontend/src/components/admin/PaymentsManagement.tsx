import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentsManagement: React.FC = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/payments")
      .then((response) => setPayments(response.data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, []);

  return (
    <div className="payments-management">
      <h2>Payments Management</h2>
      <ul>
        {payments.map((payment: any) => (
          <li key={payment.id}>Transaction ID: {payment.id} - Amount: {payment.amount}</li>
        ))}
      </ul>
    </div>
  );
};
export default PaymentsManagement;
