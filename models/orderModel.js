// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        default: 'Placed',
        enum: ['Placed', 'Accepted', 'Preparing', 'Ready for Delivery', 'In Transit', 'Delivered', 'Cancelled']
    },
    deliveryAddress: { type: String, required: true },
    placedAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date },
});

module.exports = mongoose.model('Order', orderSchema);