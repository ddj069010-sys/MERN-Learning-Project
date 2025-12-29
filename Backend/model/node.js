import mongoose from "mongoose";
const notschema = new mongoose  .Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Note = mongoose.model("Note", notschema);
export default Note;    