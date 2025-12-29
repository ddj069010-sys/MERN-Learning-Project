// Backend/src/routes/noteRoutes.js

const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  deleteMultipleNotes,
  togglePin,
  toggleArchive,
} = require("../controller/noteController");

// GET all notes
router.get("/", getAllNotes);

// GET single note
router.get("/:id", getNoteById);

// CREATE note
router.post("/", createNote);

// DELETE multiple notes
router.post("/bulk-delete", deleteMultipleNotes);

// UPDATE note
router.put("/:id", updateNote);

// DELETE note
router.delete("/:id", deleteNote);

// TOGGLE pin
router.patch("/:id/toggle-pin", togglePin);

// TOGGLE archive
router.patch("/:id/toggle-archive", toggleArchive);

module.exports = router;
