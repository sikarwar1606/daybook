import "./AddJarData.css";

const AddJarData = ({
  showCreateJar,
  categoryName,
  jarLimit,
  isCreating,
  setShowCreateJar,
  SetCategoryName,
  setJarLimit,
  handleCreateJar,
}) => {
  return (
    <section className="jar-empty-state">
      {showCreateJar ? (
        <div className="jar-form">
          <input
            type="text"
            placeholder="Jar name (e.g. Emergency Fund)"
            value={categoryName}
            onChange={(e) => SetCategoryName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Target amount"
            value={jarLimit}
            onChange={(e) => setJarLimit(e.target.value)}
          />
          <button
            className="jar-form-save-btn"
            onClick={handleCreateJar}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Jar"}
          </button>
          <button
            className="jar-form-cancel-btn"
            onClick={() => setShowCreateJar(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <button
            className="jar-add-icon-btn"
            onClick={() => setShowCreateJar(true)}
          >
            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <p className="jar-empty-title">No savings jars yet</p>
          <p className="jar-empty-subtitle">Tap the + to create your first goal</p>
        </>
      )}
    </section>
  );
};

export default AddJarData;