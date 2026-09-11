import React,{useState} from "react"

const AddIncome = ({onBack, user})=>{
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [income, setIncome] = useState(["", "", ""]);

  const handleIncomeChange = (index, value) => {
    const updated = [...income];
    updated[index] = value;
    setIncome(updated);
  };

  const handleSave = async ()=>{
    try{
        const res = await fetch(`API_URL/api/income`,{
            methord: "POST",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({
                user_id: user.user.user_id,
                income:income
            })
        });
        
        if(res.ok){
            console.log(res)
            onBack(); //go back after saving 
        }else{
            alert("Failed to save income");
        }
    }catch(err){
        console.error(err);
        alert("Network error")
    }
  }

    return (
       
    <div className="add-transaction">
      {/* Monthly Income Section */}
      <section className="section">
        <h2 className="section-title income-title">Monthly Income</h2>

        <div className="field">
          <label>Salary</label>
          <input
            type="number"
            placeholder="0"
            value={income[0]}
            onChange={(e) => handleIncomeChange(0, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Bond</label>
          <input
            type="number"
            placeholder="0"
            value={income[1]}
            onChange={(e) => handleIncomeChange(1, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Rental Income</label>
          <input
            type="number"
            placeholder="0"
            value={income[2]}
            onChange={(e) => handleIncomeChange(2, e.target.value)}
          />
        </div>

        <div className="field">
          <label>Others</label>
          <input
            type="number"
            placeholder="0"
            value={income[3]}
            onChange={(e) => handleIncomeChange(3, e.target.value)}
          />
        </div>
      </section>

      <hr className="divider" />


      <button className="submit-btn" onClick={handleSave}>Save</button>
      <button className="submit-btn" onClick={onBack}>Back</button>
    </div>
  );
}

export default AddIncome