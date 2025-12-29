const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      minlength: 1,
    },
    description: {
      type: String,
      maxlength: 500,
      default: "",
    },
    category: {
      type: String,
      enum: ["Personal", "Work", "Ideas", "Todo", "Other"],
      default: "Personal",
    },
    color: {
      type: String,
      enum: ["red", "blue", "green", "yellow", "purple", "pink"],
      default: "blue",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: {
      type: [String],
      default: [],
    },
    dueDate: {
      type: Date,
      default: null,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
