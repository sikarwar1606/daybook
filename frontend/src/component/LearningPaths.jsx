const LearningPaths = () => {
  const paths = [
    {
      id: 1,
      title: 'Investment Basics',
      progress: 40,
      status: 'Start',
      icon: (
        <svg className="w-8 h-8 text-[#156082]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Tax Strategy 101',
      progress: 0,
      status: 'Continue',
      label: 'TAX',
      icon: (
        <svg className="w-8 h-8 text-[#156082]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8M8 10h2M12 10h2M16 10h0M8 14h2M12 14h2M16 14h0M8 18h2M12 18h2M16 18h0" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Real Estate Investing',
      progress: 0,
      status: 'Continue',
      icon: (
        <svg className="w-8 h-8 text-[#156082]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Learning Paths</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paths.map((path) => (
          <div
            key={path.id}
            className="border border-gray-100 rounded-xl p-4 flex flex-col items-start hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className="mb-3">{path.icon}</div>

            {/* Label badge (e.g., TAX) */}
            {path.label && (
              <span className="text-[10px] font-bold text-[#156082] bg-[#156082]/10 px-2 py-0.5 rounded-full mb-2">
                {path.label}
              </span>
            )}

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-800 mb-2">{path.title}</h3>

            {/* Progress bar (only if started) */}
            {path.progress > 0 && (
              <div className="w-full mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#156082] transition-all"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Button */}
            <button className="mt-auto w-full text-center text-sm font-medium text-white bg-[#156082] hover:bg-[#156082]/90 py-2 rounded-lg transition">
              {path.status}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningPaths;   