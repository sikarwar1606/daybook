import { useState, useEffect } from "react";
import { Trash } from 'lucide-react';
import './AddIncome.css'
import {useFinance} from "../../context/FinanceContext.jsx"

const AddIncome = ({ onBack, user }) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
    const [isSaving, SetisSaving] = useState(false);
  const [isAdding, SetisAdding] = useState(false);
  const {refreshTotals} = useFinance();

  // Load categories + amounts on mount
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await fetch(`${API_URL}/api/income/${user.user_id}`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data.income); // [{category_id, name, amount}]
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncome();
  }, [user.user_id]);

  const handleIncomeChange = (category_id, value) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.category_id === category_id ? { ...c, amount: value } : c,
      ),
    );
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    SetisAdding(true)
    try {
      const res = await fetch(`${API_URL}/api/income/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          name: newCategoryName.trim(),
        }),
      });
      if (res.ok) {
        const newCategory = await res.json();
        setCategories((prev) => [...prev, { ...newCategory, amount: "" }]);
        setNewCategoryName("");
      } else {
        alert("Failed to add category");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }finally{
      SetisSaving(false);
    }
  };

  const handleDeleteCategory = async (category_id) => {
    try {
      const res = await fetch(`${API_URL}/api/income/category/${category_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) =>
          prev.filter((c) => c.category_id !== category_id),
        );
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleSave = async () => {
    SetisSaving(true)
    try {
      const res = await fetch(`${API_URL}/api/income`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          income: categories.map((c) => ({
            category_id: c.category_id,
            amount: c.amount,
          })),
        }),
      });
      if (res.ok) {
         await refreshTotals()
        onBack();
      } else {
        alert("Failed to save income");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }finally{
      SetisSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="add-transaction">
      {/* Monthly Income Section */}
      <section className="section">
        <h2 className="section-title income-title">Monthly Income</h2>

        {categories.map((cat) => (
          <div className="field" key={cat.category_id}>
            <label>{cat.name}</label>
            <input
              type="number"
              placeholder="0"
              value={cat.amount}
              onChange={(e) =>
                handleIncomeChange(cat.category_id, e.target.value)
              }
            />
            <button
              className="delete-btn"
              onClick={() => handleDeleteCategory(cat.category_id)}
            >
              <Trash />
            </button>
            
          </div>
        ))}

        {/* Add new category */}
        <div className="field">
          <input
            type="text"
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className="submit-btn" onClick={handleAddCategory} disabled={isAdding}>
            {isAdding ? <span className="spinner" /> : "+Add"}
          </button>
        </div>
      </section>

      <hr className="divider" />

      <div className="button-row">
        <button className="submit-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <span className="spinner"/> : "Save"}
        </button>
        <button className="submit-btn" onClick={onBack} disbaled={isSaving}>
          {isSaving ? <span className="spinner"/> : "Back"}
        </button>
      </div>
    </div>
  );
};

export default AddIncome;
