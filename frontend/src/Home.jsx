import React from "react";
import { useState, useEffect, useRef } from "react";
import { CircleUser } from "lucide-react";
import NetWorth from "./component/Networth.jsx"
import AssetsOverview from "./component/AssetsOverview.jsx"
import Liabilities from "./component/Liabilities.jsx"
import LearningPaths from "./component/LearningPaths.jsx"
import ActiveIncome from "./component/ActiveIncome.jsx"
import SavingsJar from "./component/SavingsJar.jsx"
import MultiJar from "./component/MultiJar.jsx"

// --- [FUTURE: components/Header.jsx] ---
const Header = () => (
  <header className="bg-[#156082] text-white p-4 flex  rounded-b-xl shadow-md h-35">
    <div className="flex gap-60 ">
      <h3 className="text-lg font-bold">Daybook</h3>
      <p></p>
      <CircleUser />
    </div>
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
    <>
      <Header />
      <NetWorth />
      {/* <SavingsJar/> */}
      <MultiJar totalSaved={totalSaved} goals={goals} />   
      <AssetsOverview />
      <Liabilities />
      <LearningPaths />
      <ActiveIncome />
      
    </>
  );
};

export default Home;
