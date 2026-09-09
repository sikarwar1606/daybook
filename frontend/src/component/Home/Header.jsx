// Header.jsx
import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import { CircleUser } from "lucide-react";

const Header = ({user,handleLogout}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="bg-[#156082] text-white px-4 py-3 sm:px-6 flex items-center justify-between rounded-b-xl shadow-md">
        <h3 className="text-lg font-bold tracking-tight">Daybook</h3>
        <button
          onClick={() => setShowProfile(true)}
          className="transition active:scale-95"
        >
          <CircleUser />
        </button>
      </header>

      {/* Slide-over panel */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 transition-opacity"
            onClick={() => setShowProfile(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl overflow-y-auto p-5 animate-slide-in">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <ProfileSidebar user={user} handleLogout={handleLogout} onClose={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;   