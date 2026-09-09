import React from "react";
import { useState, useEffect, useRef } from "react";

// import './Style/Home.css';
import MultiJar from "./MultiJar.jsx"
import Navbar from "../Navbar.jsx"
import Header from "./Header.jsx"

// --- Usage in Home.jsx ---
const goals = [
  { id: 1, name: 'Emergency Fund', target: 100000, risk: 'low', color: '#156082' },
  { id: 2, name: 'Safe Savings', target: 200000, risk: 'low', color: '#3a8bb5' },
  { id: 3, name: 'Moderate Growth', target: 500000, risk: 'medium', color: '#6db3d4' },
];


const Home = ({user,handleLogout}) => {
  const [totalSaved, setTotalSaved] = useState(140000);
  return (
    <main className="home-page">
      
      <Header user={user} handleLogout={handleLogout} />
      {/* <NetWorth /> */}
      <MultiJar totalSaved={totalSaved} goals={goals} />
      {/* <AssetsOverview />
      <Liabilities />
      <LearningPaths />
      <ActiveIncome /> */}
      <Navbar />
    </main>
  );
};   

export default Home;
