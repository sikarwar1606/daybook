const MultiJar = ({ totalSaved, goals }) => {
  // goals = [
  //   { id: 1, name: 'Emergency Fund', target: 100000, risk: 'low', color: '#156082' },
  //   { id: 2, name: 'Safe Savings', target: 200000, risk: 'low', color: '#3a8bb5' },
  //   { id: 3, name: 'Moderate Growth', target: 500000, risk: 'medium', color: '#6db3d4' },
  // ]

  const jars = goals.map((goal, index) => {
    const previousTotal = goals.slice(0, index).reduce((sum, g) => sum + g.target, 0);
    const jarStart = previousTotal;
    const jarEnd = previousTotal + goal.target;

    let filled = 0;
    if (totalSaved <= jarStart) {
      filled = 0;
    } else if (totalSaved >= jarEnd) {
      filled = 100;
    } else {
      filled = Math.round(((totalSaved - jarStart) / goal.target) * 100);
    }

    const isFull = filled === 100;
    const isActive = filled > 0 && filled < 100;
    const isUpcoming = filled === 0;

    return { ...goal, filled, isFull, isActive, isUpcoming };
  });

  const currentJar = jars.find((j) => j.isActive) || jars.find((j) => j.isUpcoming);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Savings Jars</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Jars row */}
        <div className="flex items-end gap-4">
          {jars.map((jar) => (
            <div key={jar.id} className="flex flex-col items-center">
              {/* Jar */}
              <div className="relative w-20 h-28">
                {/* Jar body */}
                <div
                  className={`absolute inset-0 rounded-b-2xl rounded-t-md border-2 overflow-hidden transition-all duration-500 ${
                    jar.isActive
                      ? 'border-[#156082] shadow-md'
                      : jar.isFull
                      ? 'border-green-400'
                      : 'border-gray-200'
                  }`}
                >
                  {/* Fill */}
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                    style={{
                      height: `${jar.filled}%`,
                      background: `linear-gradient(to top, ${jar.color}, ${jar.color}88)`,
                    }}
                  />
                  {/* Glass shine */}
                  <div className="absolute top-2 left-1.5 w-0.5 h-14 bg-white/50 rounded-full" />
                </div>

                {/* Lid */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-300 rounded-full border border-gray-200" />

                {/* Checkmark if full */}
                {jar.isFull && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Percentage */}
                {!jar.isFull && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xs font-bold ${jar.isActive ? 'text-white drop-shadow' : 'text-gray-400'}`}>
                      {jar.filled}%
                    </span>
                  </div>
                )}
              </div>

              {/* Label */}
              <p className={`mt-2 text-[10px] font-medium text-center leading-tight ${
                jar.isActive ? 'text-[#156082] font-bold' : 'text-gray-500'
              }`}>
                {jar.name}
              </p>
              <p className="text-[9px] text-gray-400">
                ₹{jar.target.toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>

        {/* Current progress details */}
        {currentJar && (
          <div className="sm:w-48 space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Current Goal</p>
              <p className="text-base font-bold text-gray-900">{currentJar.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Risk Level</p>
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                currentJar.risk === 'low'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {currentJar.risk === 'low' ? 'Low Risk' : 'Moderate Risk'}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Filled</p>
              <p className="text-sm font-semibold text-gray-800">
                ₹{Math.round((currentJar.filled / 100) * currentJar.target).toLocaleString('en-IN')} / ₹{currentJar.target.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Saved</p>
              <p className="text-lg font-bold text-[#156082]">
                ₹{totalSaved.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MultiJar;  