import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Search notes..."
      className="search-bar"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
