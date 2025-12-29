import React from "react";

function CategoryFilter({ onFilterChange }) {
  const categories = ["all", "Personal", "Work", "Ideas", "Todo", "Other"];

  return (
    <div className="category-filter">
      <label>Category:</label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
