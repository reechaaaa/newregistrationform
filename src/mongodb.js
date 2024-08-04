const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/logintutorial")
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});

// Define Schema with email field
const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,  // Enforce uniqueness
        required: true
    }
});

// Create Model
const Collection = mongoose.model("Collection1", LogInSchema);

module.exports = Collection;
