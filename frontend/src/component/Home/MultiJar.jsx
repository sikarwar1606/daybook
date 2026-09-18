import { useState, useEffect } from "react";
import AddJarData from "../AddData/Jar/AddJarData.jsx";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const MultiJar = ({ user }) => {
  const [goals, setGoals] = useState([]);
  const [recommendedJar, setRecommendedJar] = useState([]);
  const [totalSaved, setTotalSaved] = useState();
  const [loading, setLoading] = useState(true);
  const [showCreateJar, setShowCreateJar] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [categoryName, SetCategoryName] = useState("");
  const [jarLimit, setJarLimit] = useState("");
  const [rjCategoryId, SetRjCategoryId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  //This function is used to get the data from database
  const fetchData = async () => {
    try {
      const [res_jar, res_recommended, res_saving] = await Promise.all([
        fetch(`${API_URL}/api/aggregate/jar_category/${user.user_id}`),
        fetch(`${API_URL}/api/aggregate/recomendate_jar`),
        fetch(`${API_URL}/api/aggregate/saving/${user.user_id}`),
      ]);

      const jar_data = res_jar.ok ? await res_jar.json() : {};
      const recommended_data = res_recommended.ok
        ? await res_recommended.json()
        : {};
      const saving_data = res_saving.ok
        ? await res_saving.json()
        : { saving: 0 };

      setGoals(jar_data.goals ?? []);
      setRecommendedJar(recommended_data.recomended ?? []);
      setTotalSaved(saving_data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.user_id]);

  const handleCreateJar = async () => {
    if (!categoryName.trim() || !jarLimit) return;
    setIsCreating(true);
    try {
      const res = await fetch(`${API_URL}/api/jar/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          category_name: categoryName,
          jar_limit: Number(jarLimit),
          rj_category_id: rjCategoryId,
        }),
      });
      if (res.ok) {
        await fetchData();
        setShowCreateJar(false);
        SetCategoryName("");
        setJarLimit("");
        setActiveIndex(jars.length);
      } else {
        alert("Failed to create jar");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setIsCreating(false);
    }
  };

  const color = "#3a8bb5";

  // const [activeIndex, setActiveIndex] = useState(0);
  if (loading) return <p>Loading...</p>;

  if (goals.length === 0) {
    return (
      <AddJarData
        showCreateJar={showCreateJar}
        categoryName={categoryName}
        jarLimit={jarLimit}
        isCreating={isCreating}
        setShowCreateJar={setShowCreateJar}
        SetCategoryName={SetCategoryName}
        setJarLimit={setJarLimit}
        handleCreateJar={handleCreateJar}
      />
    );
  }

  const jars = goals.map((goal, index) => {
    const previousTotal = goals
      .slice(0, index)
      .reduce((sum, g) => sum + g.jar_limit, 0);
    const jarStart = previousTotal;
    const jarEnd = previousTotal + goal.jar_limit;

    let filled = 0;
    if (totalSaved <= jarStart) filled = 0;
    else if (totalSaved >= jarEnd) filled = 100;
    else filled = ((totalSaved - jarStart) / goal.jar_limit) * 100;
    // else filled = Math.round(((totalSaved - jarStart) / goal.jar_limit) * 100);

    return {
      ...goal,
      filled,
      isFull: filled === 100,
      isActive: filled > 0 && filled < 100,
    };
  });

  const currentJar = jars[activeIndex];

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(jars.length, i + 1));

  return (
    <section className="bg-white rounded-2xl shadow-lg p-5 mb-4 mt-10">
      <div className="relative">
        {/* Left arrow */}
        {activeIndex > 0 && (
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 active:scale-95 transition"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {activeIndex < jars.length && (
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 active:scale-95 transition"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
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
              <div
                key={jar.category_id}
                className="w-full flex-shrink-0 flex flex-col items-center px-4"
              >
                {/* Jar */}
                <div className="relative w-80 h-100">
                  <div
                    className={`absolute inset-0 rounded-b-2xl rounded-t-md border-2 overflow-hidden transition-all duration-500 ${
                      jar.isActive
                        ? "border-[#156082] shadow-md"
                        : jar.isFull
                          ? "border-green-400"
                          : "border-gray-200"
                    }`}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                      style={{
                        height: `${jar.filled}%`,
                        background: `linear-gradient(to top, ${color}, ${color}88)`,
                      }}
                    />
                    <div className="absolute top-2 left-1.5 w-0.5 h-16 bg-white/50 rounded-full" />
                  </div>

                  {/* Lid */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-gray-300 rounded-full border border-gray-200" />

                  {/* Checkmark */}
                  {jar.isFull && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Percentage */}
                  {!jar.isFull && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className={`text-sm font-bold ${jar.isActive ? "text-black drop-shadow" : "text-gray-400"}`}
                      >
                        {jar.filled.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Label */}
                <p
                  className={`mt-3 text-xs font-medium text-center ${jar.isActive ? "text-[#156082] font-bold" : "text-gray-500"}`}
                >
                  {jar.name}
                </p>

                <p className="text-[10px] text-gray-400">₹{jar.jar_limit}</p>

                <p className="mt-1 text-xs font-semibold text-gray-700">
                  ₹{Math.round((jar.filled / 100) * jar.jar_limit)} / ₹
                  {jar.jar_limit}
                </p>
              </div>
            ))}

            {/* Extra "Add Jar" slide at the end — same flex row, not a nested wrapper */}
            <div className="w-full flex-shrink-0">
              <AddJarData
                showCreateJar={showCreateJar}
                categoryName={categoryName}
                jarLimit={jarLimit}
                isCreating={isCreating}
                setShowCreateJar={setShowCreateJar}
                SetCategoryName={SetCategoryName}
                setJarLimit={setJarLimit}
                handleCreateJar={handleCreateJar}
              />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[jars, { isAddSlide: true }].map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === activeIndex ? "bg-[#156082] scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Total saved */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">Total Saved</p>
        <p className="text-xl font-bold text-[#156082]">₹{totalSaved}</p>
      </div>
    </section>
  );
};

export default MultiJar;
