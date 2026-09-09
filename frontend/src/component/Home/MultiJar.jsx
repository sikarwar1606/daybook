import { useState } from 'react';

const MultiJar = ({ totalSaved }) => {
  const goals = [
    { id: 1, name: 'Emergency Fund', target: 100000, risk: 'low', color: '#156082' },
    { id: 2, name: 'Safe Savings', target: 200000, risk: 'low', color: '#3a8bb5' },
    { id: 3, name: 'Moderate Growth', target: 500000, risk: 'medium', color: '#6db3d4' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const jars = goals.map((goal, index) => {
    const previousTotal = goals.slice(0, index).reduce((sum, g) => sum + g.target, 0);
    const jarStart = previousTotal;
    const jarEnd = previousTotal + goal.target;

    let filled = 0;
    if (totalSaved <= jarStart) filled = 0;
    else if (totalSaved >= jarEnd) filled = 100;
    else filled = Math.round(((totalSaved - jarStart) / goal.target) * 100);

    return { ...goal, filled, isFull: filled === 100, isActive: filled > 0 && filled < 100 };
  });

  const currentJar = jars[activeIndex];

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(jars.length - 1, i + 1));

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4 mt-10">
      
      <div className="relative">
        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 active:scale-95 transition"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {activeIndex < jars.length - 1 && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 active:scale-95 transition"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {jars.map((jar) => (
              <div key={jar.id} className="w-full flex-shrink-0 flex flex-col items-center px-4">
                {/* Jar */}
                <div className="relative w-80 h-100">
                  <div
                    className={`absolute inset-0 rounded-b-2xl rounded-t-md border-2 overflow-hidden transition-all duration-500 ${
                      jar.isActive
                        ? 'border-[#156082] shadow-md'
                        : jar.isFull
                        ? 'border-green-400'
                        : 'border-gray-200'
                    }`}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                      style={{
                        height: `${jar.filled}%`,
                        background: `linear-gradient(to top, ${jar.color}, ${jar.color}88)`,
                      }}
                    />
                    <div className="absolute top-2 left-1.5 w-0.5 h-16 bg-white/50 rounded-full" />
                  </div>

                  {/* Lid */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-gray-300 rounded-full border border-gray-200" />

                  {/* Checkmark */}
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
                      <span className={`text-sm font-bold ${jar.isActive ? 'text-white drop-shadow' : 'text-gray-400'}`}>
                        {jar.filled}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Label */}
                <p className={`mt-3 text-xs font-medium text-center ${jar.isActive ? 'text-[#156082] font-bold' : 'text-gray-500'}`}>
                  {jar.name}
                </p>
                <p className="text-[10px] text-gray-400">₹{jar.target.toLocaleString('en-IN')}</p>

                {/* Filled amount */}
                <p className="mt-1 text-xs font-semibold text-gray-700">
                  ₹{Math.round((jar.filled / 100) * jar.target).toLocaleString('en-IN')} / ₹{jar.target.toLocaleString('en-IN')}
                </p>

                {/* Risk badge */}
                <span className={`mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  jar.risk === 'low' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {jar.risk === 'low' ? 'Low Risk' : 'Moderate Risk'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {jars.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === activeIndex ? 'bg-[#156082] scale-110' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Total saved */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">Total Saved</p>
        <p className="text-xl font-bold text-[#156082]">₹{totalSaved.toLocaleString('en-IN')}</p>
      </div>
    </section>
  );
};

export default MultiJar;   