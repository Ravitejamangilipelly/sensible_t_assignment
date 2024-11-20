import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Transactions from "./components/Transactions";
import CreateTransaction from "./components/CreateTransaction";
import TransactionDetails from "./components/TransactionDetails";
import "./App.css";

const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/create" element={<CreateTransaction />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
