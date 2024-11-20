import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTransaction.css";

const CreateTransaction = () => {
  const [formData, setFormData] = useState({
    amount: "",
    transaction_type: "DEPOSIT",
    user: "",
  });
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setError(""); // Clear any existing errors

    // Validate input
    if (!formData.amount || !formData.user) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/transactions", {
        ...formData,
        status: "PENDING", // Default status
        timestamp: new Date().toISOString(),
      });

      console.log("Transaction created:", response.data); // Debugging info
      navigate("/"); // Redirect to transaction list
    } catch (err) {
      console.error("Error creating transaction:", err);
      setError("Failed to create transaction. Please try again.");
    }
  };

  return (
    <div className="create-transaction-container">
      <h1>Create Transaction</h1>
      {error && <p className="error-message">{error}</p>} {/* Display errors */}
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <select
          value={formData.transaction_type}
          onChange={(e) =>
            setFormData({ ...formData, transaction_type: e.target.value })
          }
        >
          <option value="DEPOSIT">DEPOSIT</option>
          <option value="WITHDRAWAL">WITHDRAWAL</option>
        </select>
        <input
          type="number"
          placeholder="User ID"
          value={formData.user}
          onChange={(e) => setFormData({ ...formData, user: e.target.value })}
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default CreateTransaction;
