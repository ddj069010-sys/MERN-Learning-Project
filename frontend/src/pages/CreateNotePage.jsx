import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import { useNotes } from "../hooks/useNotes";

function CreateNotePage() {
  const navigate = useNavigate();
  const { createNote } = useNotes();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await createNote(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-header">
          <h2>Create New Note</h2>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <NoteForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default CreateNotePage;
