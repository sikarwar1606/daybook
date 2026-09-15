import React, { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";
import "./Summary.css";

const Summary = ({ user }) => {
  const { income, expenses, loading } = useFinance();
  const balance = income - expenses;
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const now = new Date();
  const date = `${now.getMonth() + 1}${now.getFullYear()}`;

  useEffect(() => {
    const sendBalanceToDB = async () => {
      const result = await fetch(`${API_URL}/api/setData/savings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          saving: balance,
          month: date,
        }),
      });
    };
    if (balance !== 0) {
      sendBalanceToDB();
    }
  }, [balance]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  if (loading) {
    return <div className="summary skeleton" aria-label="Loading summary" />;
  }

  return (
    <div className="summary">
      <div className="summary-row">
        <span className="summary-label">Income</span>
        <span className="summary-value income">{formatCurrency(income)}</span>
      </div>
      <div className="summary-row">
        <span className="summary-label">Expenses</span>
        <span className="summary-value expense">
          {formatCurrency(expenses)}
        </span>
      </div>
      <div className="summary-divider" />
      <div className="summary-row balance-row">
        <span className="summary-label">Monthly Saving</span>
        <span
          className={`summary-value balance ${balance < 0 ? "negative" : ""}`}
        >
          {formatCurrency(balance)}
        </span>
      </div>
    </div>
  );
};

export default Summary;
