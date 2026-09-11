import './AddTransaction.css';
import React, { useState } from "react";
import AddIncome from "./AddIncome.jsx";
import AddExpences from "./AddExpences.jsx";

const AddTransaction = ({user}) => {
  const [showIncome, setShowIncome] = useState(false);
  const [showExpence, setShowExpence] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Add Transaction
      </h2>

      {showIncome ? (
        <AddIncome onBack={() => setShowIncome(false)} user={user} />
      ) : showExpence ? (
        <AddExpences onBack={() => setShowExpence(false)} />
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <button
            onClick={() => setShowIncome(true)}
            className="group relative flex-1 flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-lg">Add Income</span>
            <span className="text-sm text-gray-500">Track your earnings</span>
          </button>

          <button
            onClick={() => setShowExpence(true)}
            className="group relative flex-1 flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-lg">Add Expenses</span>
            <span className="text-sm text-gray-500">Log your spending</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;   