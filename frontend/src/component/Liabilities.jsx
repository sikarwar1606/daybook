const Liabilities = () => {
  const debts = [
    { name: 'Mortgage', amount: 110000, color: '#156082' },
    { name: 'Student Loan', amount: 25000, color: '#3a8bb5' },
    { name: 'Car Loan', amount: 10000, color: '#6db3d4' },
  ];

  const upcoming = [
    { name: 'Mortgage', due: 'Nov 15th', amount: 2500 },
    { name: 'Student Loan', due: 'Nov 20th', amount: 450 },
  ];

  const maxAmount = Math.max(...debts.map((d) => d.amount));
  const total = debts.reduce((sum, d) => sum + d.amount, 0);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800">Liabilities</h2>
        <span className="text-sm font-semibold text-red-600">
          ₹{total.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Left: Horizontal Bar Chart */}
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
            Debt Overview
          </p>
          <div className="space-y-3">
            {debts.map((debt) => (
              <div key={debt.name}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{debt.name}</span>
                  <span className="font-semibold">
                    ₹{debt.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${(debt.amount / maxAmount) * 100}%`,
                      backgroundColor: debt.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-[10px] text-gray-400">
            <span>₹0</span>
            <span>₹{Math.round(maxAmount / 4).toLocaleString('en-IN')}</span>
            <span>₹{Math.round(maxAmount / 2).toLocaleString('en-IN')}</span>
            <span>₹{Math.round((3 * maxAmount) / 4).toLocaleString('en-IN')}</span>
            <span>₹{maxAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Right: Upcoming Payments */}
        <div className="sm:w-56">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-3">
            Upcoming Payments
          </p>
          <div className="space-y-3">
            {upcoming.map((payment) => (
              <div
                key={payment.name}
                className="bg-gray-50 rounded-lg p-3"
              >
                <p className="text-sm font-medium text-gray-800">{payment.name}</p>
                <p className="text-xs text-gray-500">Due: {payment.due}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Liabilities;   