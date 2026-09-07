const NetWorth = ({ assetTotal = 325000, liabilityTotal = 57000, income = 78500, goalProgress = 65 }) => {
  const netWorth = assetTotal - liabilityTotal;

  return (
    <div className="relative z-10 bg-white rounded-2xl shadow-lg p-5 mb-4">
      {/* Net Worth */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Net Worth</p>
          <h3 className="text-2xl font-bold text-gray-900">
            ₹{netWorth.toLocaleString('en-IN')}
          </h3>
        </div>
        {/* Circular progress */}
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18" cy="18" r="15.5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <circle
              cx="18" cy="18" r="15.5"
              fill="none"
              stroke="#156082"
              strokeWidth="3"
              strokeDasharray={`${goalProgress * 0.974} 97.4`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#156082]">
            {goalProgress}%
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-3 flex gap-6">
        <div>
          <p className="text-xs text-gray-500 font-medium">Active Income (This Month)</p>
          <h3 className="text-base font-semibold text-gray-800">
            ₹{income.toLocaleString('en-IN')}
          </h3>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Goal Progress</p>
          <h3 className="text-base font-semibold text-gray-800">{goalProgress}%</h3>
        </div>
      </div>
    </div>
  );
};

export default NetWorth;   