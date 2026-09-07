import React from "react";
import { CircleUser } from "lucide-react";
import NetWorth from "./component/Networth.jsx"
import AssetsOverview from "./component/AssetsOverview.jsx"
import Liabilities from "./component/Liabilities.jsx"
import LearningPaths from "./component/LearningPaths.jsx"
import ActiveIncome from "./component/ActiveIncome.jsx"

// --- [FUTURE: components/Header.jsx] ---
const Header = () => (
  <header className="bg-[#156082] text-white p-4 flex  rounded-b-xl shadow-md h-35">
    <div className="flex gap-60 ">
      <h3 className="text-lg font-bold">Daybook</h3>
      <CircleUser />
    </div>
  </header>
);


const Home = () => {
  return (
    <>
      <Header />
      <NetWorth />
      <AssetsOverview />
      <Liabilities />
      <LearningPaths />
      <ActiveIncome />
    </>
  );
};

export default Home;
