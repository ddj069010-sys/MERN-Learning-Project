import React, { useState } from "react";
import NoteItem from "./NoteItem";

function NotesList({
  notes,
  onPin,
  onArchive,
  onDelete,
  onEdit,
  loading,
  error,
}) {
  const [filterArchived, setFilterArchived] = useState(false);

  const filteredNotes = notes.filter((note) =>
    filterArchived ? note.archived : !note.archived
  );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const regularNotes = filteredNotes.filter((note) => !note.pinned);

  if (loading) return <div className="loading">Loading notes...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="notes-list">
      <div className="filter-controls">
        <button
          className={`filter-btn ${!filterArchived ? "active" : ""}`}
          onClick={() => setFilterArchived(false)}
        >
          Active Notes
        </button>
        <button
          className={`filter-btn ${filterArchived ? "active" : ""}`}
          onClick={() => setFilterArchived(true)}
        >
          Archived Notes
        </button>
      </div>

      {pinnedNotes.length > 0 && (
        <div className="notes-section">
          <h3>📌 Pinned</h3>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                onPin={onPin}
                onArchive={onArchive}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {regularNotes.length > 0 && (
        <div className="notes-section">
          <h3>📂 All Notes</h3>
          <div className="notes-grid">
            {regularNotes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                onPin={onPin}
                onArchive={onArchive}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {filteredNotes.length === 0 && (
        <div className="empty-state">
          <p>No {filterArchived ? "archived" : "active"} notes yet!</p>
          <p>Create your first note to get started.</p>
        </div>
      )}
    </div>
  );
}

export default NotesList;
