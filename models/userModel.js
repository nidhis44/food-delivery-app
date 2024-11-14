// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'restaurant_owner', 'delivery_personnel', 'admin']
    },
    contactInfo: {
        phone: { type: String },
        address: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);