import { useState, useEffect } from "react";
import "./Summary.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Summary = ({ user }) => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotals = async () => {
            setLoading(true);
            try {
                const [incomeRes, expenseRes] = await Promise.all([
                    fetch(`${API_URL}/api/aggregate/income/${user.user_id}`),
                    fetch(`${API_URL}/api/aggregate/expences/${user.user_id}`)
                ]);

                if (incomeRes.ok) {
                    const data = await incomeRes.json();
                    setIncome(Number(data.total));
                }
                if (expenseRes.ok) {
                    const data = await expenseRes.json();
                    setExpenses(Number(data.total));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTotals();
    }, [user.user_id]);

    const balance = income - expenses;

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
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
                <span className="summary-value expense">{formatCurrency(expenses)}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row balance-row">
                <span className="summary-label">Monthly Saving</span>
                <span className={`summary-value balance ${balance < 0 ? "negative" : ""}`}>
                    {formatCurrency(balance)}
                </span>
            </div>
        </div>
    );
};

export default Summary;