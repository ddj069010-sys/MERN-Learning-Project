import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import { useNotes } from "../hooks/useNotes";
import { notesAPI } from "../services/api";

function EditNotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateNote } = useNotes();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await notesAPI.getById(id);
      setNote(response.data.data);
    } catch (err) {
      setError("Failed to load note");
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateNote(id, formData);
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
          <h2>Edit Note</h2>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {note && (
          <NoteForm onSubmit={handleSubmit} initialData={note} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default EditNotePage;
