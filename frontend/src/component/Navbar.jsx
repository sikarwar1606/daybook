import { Home, PlusSquare,TrendingUp } from "lucide-react";

const Navbar = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 px-4 z-50">
    <button className="flex flex-col items-center gap-0.5 text-gray-700">
      <Home size={24} />
      <span className="text-[10px]">Home</span>
    </button>

    <button className="flex flex-col items-center gap-0.5 text-gray-700">
      <PlusSquare size={24} />
      <span className="text-[10px]">Add</span>
    </button>
    <button className="flex flex-col items-center gap-0.5 text-gray-700">
      <TrendingUp size={24}/>
      <span className="text-[10px]">Trending</span>
    </button>
  </nav>
);

export default Navbar;
