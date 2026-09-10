// // AddTransaction.jsx
// const AddTransaction = ({ onClose, onAddIncome, onAddExpense }) => {
//   return (
//     <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center mb-100 ">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       {/* Sheet */}
//       <div className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 animate-slide-up">
//         {/* Drag handle (mobile) */}
//         <div className="sm:hidden w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

//         <h3 className="text-lg font-bold text-gray-900 text-center mb-6">Add Transaction</h3>

//         <div className="flex gap-4">
//           {/* Income */}
//           <button
//             onClick={onAddIncome}
//             className="flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl bg-green-50 border-2 border-green-200 hover:border-green-400 hover:bg-green-100 transition active:scale-95"
//           >
//             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//             </div>
//             <span className="text-sm font-semibold text-green-700">Income</span>
//             <span className="text-[10px] text-green-500">Salary, Freelance, Rental</span>
//           </button>

//           {/* Expense */}
//           <button
//             onClick={onAddExpense}
//             className="flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl bg-red-50 border-2 border-red-200 hover:border-red-400 hover:bg-red-100 transition active:scale-95"
//           >
//             <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//               </svg>
//             </div>
//             <span className="text-sm font-semibold text-red-700">Expense</span>
//             <span className="text-[10px] text-red-500">Shopping, Bills, EMI</span>
//           </button>
//         </div>

//         {/* Cancel */}
//         <button
//           onClick={onClose}
//           className="mt-4 w-full py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddTransaction;   

import './AddTransaction.css'
import React, { useState } from "react";

const AddTransaction = () => {
  const [income, setIncome] = useState(["", "", ""]);
  const [expenses, setExpenses] = useState(["", "", "", ""]);

  const handleIncomeChange = (index, value) => {
    const updated = [...income];
    updated[index] = value;
    setIncome(updated);
  };

  const handleExpenseChange = (index, value) => {
    const updated = [...expenses];
    updated[index] = value;
    setExpenses(updated);
  };

  return (
    <div className="add-transaction">
      {/* Monthly Income Section */}
      <section className="section">
        <h2 className="section-title income-title">Monthly Income</h2>

        <div className="field">
          <label>Income Source 1</label>
          <input
            type="number"
            placeholder="0"
            value={income[0]}
            onChange={(e) => handleIncomeChange(0, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Income Source 2</label>
          <input
            type="number"
            placeholder="0"
            value={income[1]}
            onChange={(e) => handleIncomeChange(1, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Income Source 3</label>
          <input
            type="number"
            placeholder="0"
            value={income[2]}
            onChange={(e) => handleIncomeChange(2, e.target.value)}
          />
        </div>
      </section>

      <hr className="divider" />

      {/* Monthly Expenses Section */}
      <section className="section">
        <h2 className="section-title expense-title">Monthly Expenses</h2>

        <div className="field">
          <label>Expense 1</label>
          <input
            type="number"
            placeholder="0"
            value={expenses[0]}
            onChange={(e) => handleExpenseChange(0, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Expense 2</label>
          <input
            type="number"
            placeholder="0"
            value={expenses[1]}
            onChange={(e) => handleExpenseChange(1, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Expense 3</label>
          <input
            type="number"
            placeholder="0"
            value={expenses[2]}
            onChange={(e) => handleExpenseChange(2, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Expense 4</label>
          <input
            type="number"
            placeholder="0"
            value={expenses[3]}
            onChange={(e) => handleExpenseChange(3, e.target.value)}
          />
        </div>
      </section>

      <button className="submit-btn">Save</button>
    </div>
  );
};

export default AddTransaction;   