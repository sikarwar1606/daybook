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
import {FinanceProvider} from "../../context/FinanceContext.jsx"
import {Routes, Route} from 'react-router-dom'

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const Home = ({user, handleLogout}) => {
  const [totalSaved, setTotalSaved] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <FinanceProvider user={user}>
      <Summary user={user} />
      <MultiJar user={user} />

      {/* <Routes>
        <Route path="/" element={<MultiJar user={user} />} />
      </Routes> */}
      
    {/* <main className="home-page">
      <Header user={user} handleLogout={handleLogout} />
      <Summary user={user} />

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && (<MultiJar user={user} /> )}
      {currentPage === "addTransaction" && <AddTransaction user={user}/>}
      {currentPage === "trending" && <Trending user={user} />}
    </main> */}
    </FinanceProvider>
  );
};

export default Home;
