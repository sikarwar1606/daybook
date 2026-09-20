import React from "react";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTransaction from "../AddData/AddTransaction.jsx";
import MultiJar from "./MultiJar.jsx";
import Trending from "../AddData/Trending.jsx"
import Navbar from "../Navbar.jsx"
import Header from "./Header.jsx";
import Summary from "./Summary.jsx";
import Loader from "../../Loader.jsx"
import {useFinance} from "../../context/FinanceContext.jsx"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Home = ({user, handleLogout}) => {
  const [totalSaved, setTotalSaved] = useState();
  const [currentPage, setCurrentPage] = useState("home");
  const { income, expenses, loading } = useFinance();

    if(loading){
      <Loader />
    }
  return (
    
      
    <main className="home-page">
      <Header user={user} handleLogout={handleLogout} />
      <Summary user={user} income={income} expenses={expenses} />

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && (<MultiJar user={user} /> )}
      {currentPage === "addTransaction" && <AddTransaction user={user}/>}
      {currentPage === "trending" && <Trending user={user} />}
    </main>
    
  );
};

export default Home;
