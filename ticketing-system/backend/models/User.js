const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    role: {type: String, enum: ['customer','admin'], default:'customer'},
    createdAt: {type: Date, default: Date.now}
});

const User = mongoose.model("User",UserSchema);

module.exports = User;