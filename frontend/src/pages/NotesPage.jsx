import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import NotesList from "../components/NotesList";
import { useNotes } from "../hooks/useNotes";

function NotesPage() {
  const navigate = useNavigate();
  const {
    notes,
    loading,
    error,
    fetchNotes,
    togglePin,
    toggleArchive,
    deleteNote,
  } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchNotes({
      search: term,
      category: categoryFilter !== "all" ? categoryFilter : undefined,
    });
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    fetchNotes({
      search: searchTerm,
      category: category !== "all" ? category : undefined,
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-header">
          <button
            className="create-btn"
            onClick={() => navigate("/create")}
          >
            ➕ New Note
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />
        <CategoryFilter onFilterChange={handleCategoryFilter} />

        <NotesList
          notes={notes}
          loading={loading}
          error={error}
          onPin={togglePin}
          onArchive={toggleArchive}
          onDelete={deleteNote}
          onEdit={(id) => navigate(`/edit/${id}`)}
        />
      </div>
    </div>
  );
}

export default NotesPage;
