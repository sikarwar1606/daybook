const SavingsJar = ({ goal = 100000, saved = 150000 }) => {
  const progress = Math.min((saved / goal) * 100);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Savings Jar</h2>

      <div className="flex items-center justify-center gap-8">
        {/* Jar */}
        <div className="relative w-32 h-44">
          {/* Jar body */}
          <div className="absolute inset-0 rounded-b-3xl rounded-t-lg border-2 border-gray-200 bg-gray-50/50 overflow-hidden">
            {/* Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
              style={{
                height: `${progress}%`,
                background: 'linear-gradient(to top, #156082, #6db3d4)',
              }}
            >
              {/* Bubbles */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute w-2 h-2 bg-white rounded-full" style={{ left: '20%', top: '30%' }} />
                <div className="absolute w-1.5 h-1.5 bg-white rounded-full" style={{ left: '60%', top: '50%' }} />
                <div className="absolute w-1 h-1 bg-white rounded-full" style={{ left: '40%', top: '70%' }} />
              </div>
            </div>

            {/* Glass shine */}
            <div className="absolute top-2 left-2 w-1 h-20 bg-white/40 rounded-full" />
          </div>

          {/* Jar lid */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-300 rounded-full border-2 border-gray-200" />

          {/* Coin slot */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-400 rounded-full" />

          {/* Percentage label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#156082] drop-shadow-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Saved</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{saved.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Goal</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{goal.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Remaining</p>
            <p className="text-xl font-bold text-red-500">
              ₹{(goal - saved).toLocaleString('en-IN')}
            </p>
          </div>

          <button className="mt-2 w-full text-sm font-medium text-white bg-[#156082] hover:bg-[#156082]/90 py-2 rounded-lg transition">
            + Add Money
          </button>
        </div>
      </div>
    </section>
  );
};

export default SavingsJar;   