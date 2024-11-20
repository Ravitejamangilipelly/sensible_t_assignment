import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/transactions?user=${userId}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  return (
    <div className="transactions-container">
      <h1>Transaction History</h1>
      <input
        type="number"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="user-id-input"
      />
      <ul className="transactions-list">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Link to={`/transactions/${transaction.id}`}>
              {transaction.transaction_type} - ${transaction.amount} -{" "}
              {transaction.status}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create">
        <button>Create Transaction</button>
      </Link>
    </div>
  );
};

export default Transactions;
