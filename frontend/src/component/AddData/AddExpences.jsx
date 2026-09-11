import React,{useState} from "react"

const AddExpences = ({onBack})=>{
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
      <button className="submit-btn" onClick={onBack}>Back</button>
    </div>
  );
}

export default AddExpences