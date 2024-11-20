import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TransactionDetails.css";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/transactions/${id}`)
      .then((res) => setTransaction(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!transaction) return <p>Loading...</p>;

  return (
    <div>
      <h1>Transaction Details</h1>
      <p>ID: {transaction.id}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Type: {transaction.transaction_type}</p>
      <p>Status: {transaction.status}</p>
      <p>Timestamp: {transaction.timestamp}</p>
    </div>
  );
};

export default TransactionDetails;
