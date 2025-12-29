import React, { useState, useEffect } from "react";
import "../styles/NoteForm.css";

function NoteForm({ onSubmit, initialData, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    category: "Personal",
    color: "blue",
    priority: "medium",
    tags: "",
    dueDate: "",
    pinned: false,
  });

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
      });
      setCharCount(initialData.content?.length || 0);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (name === "content") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    onSubmit(submitData);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {/* Title Section */}
      <div className="form-section">
        <h2 className="section-title">📝 Basic Information</h2>
        
        <div className="form-group">
          <label htmlFor="title" className="label-required">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter an engaging title for your note..."
            required
            className="input-lg"
          />
          <span className="help-text">Give your note a clear, descriptive title</span>
        </div>
      </div>

      {/* Category, Color, Priority */}
      <div className="form-section">
        <h2 className="section-title">🎨 Appearance & Organization</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="Personal">📌 Personal</option>
              <option value="Work">💼 Work</option>
              <option value="Ideas">💡 Ideas</option>
              <option value="Todo">✅ Todo</option>
              <option value="Other">📂 Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="color">Color</label>
            <select 
              id="color"
              name="color" 
              value={formData.color} 
              onChange={handleChange}
            >
              <option value="red">🔴 Red</option>
              <option value="blue">🔵 Blue</option>
              <option value="green">🟢 Green</option>
              <option value="yellow">🟡 Yellow</option>
              <option value="purple">🟣 Purple</option>
              <option value="pink">🩷 Pink</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select 
              id="priority"
              name="priority" 
              value={formData.priority} 
              onChange={handleChange}
            >
              <option value="low">⬇️ Low</option>
              <option value="medium">➡️ Medium</option>
              <option value="high">⬆️ High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="form-section">
        <h2 className="section-title">📄 Summary</h2>
        
        <div className="form-group">
          <label htmlFor="description">Brief Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a short summary (max 500 characters)..."
            maxLength={500}
            className="input-md"
          />
          <span className="help-text">
            {formData.description.length}/500 characters
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="form-section">
        <h2 className="section-title">✍️ Content</h2>
        
        <div className="form-group">
          <label htmlFor="content" className="label-required">
            Note Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your detailed note content here. Support for unlimited text..."
            rows={12}
            required
            className="textarea-lg"
          />
          <span className="help-text">
            {charCount} characters | Tips: Be clear, organized, and concise
          </span>
        </div>
      </div>

      {/* Tags & Due Date */}
      <div className="form-section">
        <h2 className="section-title">🏷️ Tags & Schedule</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, learning"
              className="input-md"
            />
            <span className="help-text">Separate tags with commas for easy organization</span>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <span className="help-text">Set a reminder date for this note</span>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="form-section">
        <h2 className="section-title">⭐ Options</h2>
        
        <div className="form-group checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="pinned"
              name="pinned"
              checked={formData.pinned}
              onChange={handleChange}
            />
            <label htmlFor="pinned">📌 Pin this note to the top</label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? (
            <span>⏳ Saving...</span>
          ) : (
            <span>💾 Save Note</span>
          )}
        </button>
        <button 
          type="reset" 
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          ❌ Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
