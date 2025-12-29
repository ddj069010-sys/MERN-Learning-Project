import React from "react";

function NoteItem({ note, onPin, onArchive, onDelete, onEdit }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const colorClass = `color-${note.color || "blue"}`;

  return (
    <div className={`note-item ${colorClass}`}>
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button
            className={`pin-btn ${note.pinned ? "active" : ""}`}
            onClick={() => onPin(note._id)}
            title="Pin note"
          >
            📌
          </button>
          <button
            className={`archive-btn ${note.archived ? "active" : ""}`}
            onClick={() => onArchive(note._id)}
            title="Archive note"
          >
            📦
          </button>
          <button
            className="edit-btn"
            onClick={() => onEdit(note._id)}
            title="Edit note"
          >
            ✏️
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(note._id)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="note-description">
        {note.description || note.content.substring(0, 100)}...
      </p>

      <div className="note-meta">
        <span className="category">{note.category}</span>
        <span className="priority">{note.priority}</span>
        <span className="date">{formatDate(note.createdAt)}</span>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteItem;
