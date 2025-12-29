import { useState, useEffect } from "react";
import { notesAPI } from "../services/api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await notesAPI.getAll(filters);
      setNotes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const response = await notesAPI.create(noteData);
      setNotes([response.data.data, ...notes]);
      return response.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to create note");
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.update(id, noteData);
      setNotes(
        notes.map((note) => (note._id === id ? response.data.data : note))
      );
      return response.data.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesAPI.delete(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to delete note");
    }
  };

  const togglePin = async (id) => {
    try {
      const response = await notesAPI.togglePin(id);
      setNotes(
        notes.map((note) => (note._id === id ? response.data.data : note))
      );
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to toggle pin");
    }
  };

  const toggleArchive = async (id) => {
    try {
      const response = await notesAPI.toggleArchive(id);
      setNotes(
        notes.map((note) => (note._id === id ? response.data.data : note))
      );
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to toggle archive"
      );
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
  };
};
