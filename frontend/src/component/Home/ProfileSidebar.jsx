

const ProfileSidebar = ({ onClose, user,handleLogout }) => {
  const menuItems = [
    { icon: '👤', label: 'My Profile', active: true },
    { icon: '📊', label: 'Net Worth' },
    { icon: '🏺', label: 'Savings Jars' },
    { icon: '📈', label: 'Investments' },
    { icon: '💳', label: 'Assets' },
    { icon: '📉', label: 'Liabilities' },
    { icon: '📚', label: 'Learning Paths' },
    { icon: '💰', label: 'Income' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* User card */}
      <div className="flex flex-col items-center mb-6 pb-5 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-[#156082] flex items-center justify-center text-white text-xl font-bold">
          <img 
            src={user.avatar_url}
            alt=":("
      
          />
        </div>
        <h3 className="mt-3 text-sm font-bold text-gray-900">{user.username}</h3>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              item.active
                ? 'bg-[#156082] text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button onClick={handleLogout} className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition">
        <span>🚪</span>
        Log Out
      </button>
    </div>
  );
};

export default ProfileSidebar;   