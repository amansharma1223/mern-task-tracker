function Filter({ filter, setFilter }) {
  return (
    <div className="filter-box">
      <button
        className={filter === "All" ? "active-filter" : ""}
        onClick={() => setFilter("All")}
      >
        All
      </button>

      <button
        className={filter === "Pending" ? "active-filter" : ""}
        onClick={() => setFilter("Pending")}
      >
        Pending
      </button>

      <button
        className={filter === "Completed" ? "active-filter" : ""}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default Filter;