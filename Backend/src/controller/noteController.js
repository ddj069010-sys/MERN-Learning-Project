const Note = require("../models/noteModel");

// GET all notes
exports.getAllNotes = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching notes",
    });
  }
};

// GET single note
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
      message: "Note fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching note",
    });
  }
};

// CREATE note
exports.createNote = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { title, content, description, category, color, priority, tags, dueDate, pinned } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // Validate tags
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array",
      });
    }

    const newNote = await Note.create({
      title: title.trim(),
      content: content.trim(),
      description: description || "",
      category: category || "Personal",
      color: color || "blue",
      priority: priority || "medium",
      tags: tags || [],
      dueDate: dueDate ? new Date(dueDate) : null,
      pinned: pinned || false,
    });

    console.log("Note created:", newNote);

    res.status(201).json({
      success: true,
      data: newNote,
      message: "Note created successfully",
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating note",
    });
  }
};

// UPDATE note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent updating immutable fields
    const { _id, createdAt, updatedAt, ...updateData } = req.body;

    const note = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error updating note",
    });
  }
};

// DELETE note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting note",
    });
  }
};

// DELETE multiple notes
exports.deleteMultipleNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of note IDs to delete",
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting multiple notes:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting notes",
    });
  }
};

// TOGGLE pin
exports.togglePin = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.status(200).json({
      success: true,
      data: note,
      message: "Pin toggled successfully",
    });
  } catch (error) {
    console.error("Error toggling pin:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error toggling pin",
    });
  }
};

// TOGGLE archive
exports.toggleArchive = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.archived = !note.archived;
    await note.save();

    res.status(200).json({
      success: true,
      data: note,
      message: "Archive toggled successfully",
    });
  } catch (error) {
    console.error("Error toggling archive:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error toggling archive",
    });
  }
};
