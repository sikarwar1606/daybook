// context/FinanceContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const FinanceContext = createContext(null);

export const FinanceProvider = ({ user, children }) => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [loading, setLoading] = useState(true);

    const refreshTotals = useCallback(async () => {
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
    }, [user.user_id]);


    useEffect(() => {
        refreshTotals();
    }, [refreshTotals]); 

    return (
        <FinanceContext.Provider
            value={{ income, expenses, loading, refreshTotals }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

// Custom hook for easy access anywhere
export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error("useFinance must be used within a FinanceProvider");
    }
    return context;
};