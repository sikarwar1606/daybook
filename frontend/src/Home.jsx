import React from "react";
import { useState, useEffect, useRef } from "react";
import { CircleUser } from "lucide-react";
import './Home.css';
import NetWorth from "./component/Networth.jsx"
import AssetsOverview from "./component/AssetsOverview.jsx"
import Liabilities from "./component/Liabilities.jsx"
import LearningPaths from "./component/LearningPaths.jsx"
import ActiveIncome from "./component/ActiveIncome.jsx"
import SavingsJar from "./component/SavingsJar.jsx"
import MultiJar from "./component/MultiJar.jsx"
import Navbar from "./component/Navbar.jsx"

// --- [FUTURE: components/Header.jsx] ---
const Header = () => (
  <header className="bg-[#156082] text-white px-4 py-3 sm:px-6 mt-4 flex items-center justify-between  shadow-md">
    <h3 className="text-lg font-bold tracking-tight">Daybook</h3>
    <CircleUser />
  </header>
);   
// --- Usage in Home.jsx ---
const goals = [
  { id: 1, name: 'Emergency Fund', target: 100000, risk: 'low', color: '#156082' },
  { id: 2, name: 'Safe Savings', target: 200000, risk: 'low', color: '#3a8bb5' },
  { id: 3, name: 'Moderate Growth', target: 500000, risk: 'medium', color: '#6db3d4' },
];





const Home = () => {
  const [totalSaved, setTotalSaved] = useState(140000);
  return (
    <main className="home-page">
      <Header />
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
