import React from "react";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, PlusSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddTransaction from "../AddData/AddTransaction.jsx";
import MultiJar from "./MultiJar.jsx";
import Trending from "../AddData/Trending.jsx"
import Navbar from "../Navbar.jsx"
import Header from "./Header.jsx";

// --- Usage in Home.jsx ---
const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 100000,
    risk: "low",
    color: "#156082",
  },
  {
    id: 2,
    name: "Safe Savings",
    target: 200000,
    risk: "low",
    color: "#3a8bb5",
  },
  {
    id: 3,
    name: "Moderate Growth",
    target: 500000,
    risk: "medium",
    color: "#6db3d4",
  },
];


const Home = ({user, handleLogout}) => {
  const [totalSaved, setTotalSaved] = useState(140000);

  const [currentPage, setCurrentPage] = useState("home");

  return (
    <main className="home-page">
      <Header user={user} handleLogout={handleLogout} />
      {/* <NetWorth /> */}

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" && (<MultiJar totalSaved={totalSaved} goals={goals} /> )}
      {currentPage === "addTransaction" && <AddTransaction />}
      {currentPage === "trending" && <Trending />}
    </main>
  );
};

export default Home;
