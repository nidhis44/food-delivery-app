// controllers/deliveryController.js
const Order = require('../models/orderModel');

const deliveryController = {
    viewAvailableDeliveries: async (req, res) => {
        try {
            const orders = await Order.find({ status: 'Ready for Delivery' });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve deliveries', error: error.message });
        }
    },

    acceptDelivery: async (req, res) => {
        try {
            await Order.findByIdAndUpdate(req.params.orderId, { status: 'In Transit', deliveryPersonId: req.user.id });
            res.status(200).json({ message: 'Delivery accepted' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to accept delivery', error: error.message });
        }
    },

    updateDeliveryStatus: async (req, res) => {
        try {
            const { status } = req.body;
            await Order.findByIdAndUpdate(req.params.orderId, { status });
            res.status(200).json({ message: 'Delivery status updated' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update delivery status', error: error.message });
        }
    },

    setAvailability: async (req, res) => {
        try {
            const { available } = req.body;
            await DeliveryPerson.findByIdAndUpdate(req.user.id, { available });
            res.status(200).json({ message: 'Availability updated' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update availability', error: error.message });
        }
    },
};

module.exports = deliveryController;