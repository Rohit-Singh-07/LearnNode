const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    }
});

// Create and export the model based on the schema
module.exports = mongoose.model("User", userSchema);
