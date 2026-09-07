const AssetsOverview = () => {
  const allocation = [
    { label: 'Stocks', value: 45, color: '#156082' },
    { label: 'Real Estate', value: 30, color: '#3a8bb5' },
    { label: 'Cash', value: 15, color: '#6db3d4' },
    { label: 'Crypto', value: 10, color: '#a8d4ea' },
  ];

  const holdings = [
    { name: 'S&P 500 ETF', amount: 75400 },
    { name: 'Tech Growth Fund', amount: 41200 },
    { name: '123 Main St Equity', amount: 65000 },
  ];

  // --- SVG Donut Chart helper ---
  const DonutChart = ({ data, size = 160, strokeWidth = 28 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {data.map((item, i) => {
          const dash = (item.value / 100) * circumference;
          const gap = circumference - dash;
          const element = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return element;
        })}
      </svg>
    );
  };

  const total = holdings.reduce((sum, h) => sum + h.amount, 0);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Assets Overview</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Left: Donut Chart + Legend */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <DonutChart data={allocation} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-1">
            {allocation.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Holdings list */}
        <div className="flex-1 w-full">
          <ul className="space-y-3">
            {holdings.map((h) => (
              <li
                key={h.name}
                className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0"
              >
                <span className="text-gray-700">{h.name}:</span>
                <span className="font-semibold text-gray-900">
                  ${h.amount.toLocaleString('en-US')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AssetsOverview;   