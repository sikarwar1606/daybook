import { useFinance } from "../../context/FinanceContext";
import "./Summary.css";

const Summary = () => {
    const { income, expenses, loading } = useFinance();
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