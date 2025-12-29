const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../../.env") });

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const notesCollection = mongoose.connection.db.collection("notes");

        const indexName = "title_text_content_text_tags_1";

        // Check if exists first
        const indexes = await notesCollection.indexes();
        const exists = indexes.some(i => i.name === indexName);

        if (exists) {
            console.log(`Dropping index: ${indexName}...`);
            await notesCollection.dropIndex(indexName);
            console.log("✅ Index dropped successfully.");
        } else {
            console.log(`Index ${indexName} not found, skipping.`);
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error dropping index:", error);
        process.exit(1);
    }
};

fixIndexes();
