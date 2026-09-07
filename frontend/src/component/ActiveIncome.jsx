import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ActiveIncome = () => {
  const data = [
    { month: 'Jan', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'Feb', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'Mar', salary: 2400, sideHustle: 350, total: 2750 },
    { month: 'Apr', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'May', salary: 1200, sideHustle: 350, total: 1550 },
    { month: 'Jun', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'Jul', salary: 2400, sideHustle: 350, total: 2750 },
    { month: 'Aug', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'Sep', salary: 2000, sideHustle: 0, total: 2000 },
    { month: 'Oct', salary: 2900, sideHustle: 350, total: 3250 },
    { month: 'Nov', salary: 2400, sideHustle: 0, total: 2400 },
    { month: 'Dec', salary: 2400, sideHustle: 350, total: 2750 },
  ];

  const totalSalary = data.reduce((sum, d) => sum + d.salary, 0);
  const totalSide = data.reduce((sum, d) => sum + d.sideHustle, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-xs">
          <p className="font-semibold text-gray-800 mb-1">{label} 15</p>
          <p className="text-gray-500 mb-2">₹{d.total.toLocaleString('en-IN')}.00</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#156082]" />
              <span className="text-gray-600">Primary Salary</span>
            </div>
            <p className="pl-4 text-gray-800 font-medium">₹{d.salary.toLocaleString('en-IN')} - ₹{totalSalary.toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#6db3d4]" />
              <span className="text-gray-600">Side Hustle</span>
            </div>
            <p className="pl-4 text-gray-800 font-medium">₹{d.sideHustle.toLocaleString('en-IN')} - ₹{totalSide.toLocaleString('en-IN')}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Active Income</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart */}
        <div className="flex-1 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#156082" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#156082" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#156082"
                strokeWidth={2.5}
                fill="url(#incomeGradient)"
                dot={{ r: 3, fill: '#156082', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#156082' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Breakdown */}
        <div className="lg:w-48 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#156082]" />
              <span className="text-xs text-gray-500 font-medium">Primary Salary</span>
            </div>
            <p className="text-sm font-semibold text-gray-800 pl-5">
              ₹{Math.max(...data.map(d => d.salary)).toLocaleString('en-IN')} - ₹{totalSalary.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#6db3d4]" />
              <span className="text-xs text-gray-500 font-medium">Side Hustle</span>
            </div>
            <p className="text-sm font-semibold text-gray-800 pl-5">
              ₹{Math.max(...data.map(d => d.sideHustle)).toLocaleString('en-IN')} - ₹{totalSide.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveIncome;   