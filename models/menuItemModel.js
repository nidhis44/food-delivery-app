// models/menuItemModel.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);