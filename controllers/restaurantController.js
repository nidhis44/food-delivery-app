// controllers/restaurantController.js
const Restaurant = require('../models/restaurantModel');
const Order = require('../models/orderModel');

const restaurantController = {
    manageMenu: async (req, res) => {
        try {
            const { menu } = req.body;
            await Restaurant.findByIdAndUpdate(req.user.restaurantId, { menu });
            res.status(200).json({ message: 'Menu updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update menu', error: error.message });
        }
    },

    viewOrders: async (req, res) => {
        try {
            const orders = await Order.find({ restaurantId: req.user.restaurantId });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const { status } = req.body;
            await Order.findByIdAndUpdate(req.params.orderId, { status });
            res.status(200).json({ message: 'Order status updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update order status', error: error.message });
        }
    },

    updateRestaurantDetails: async (req, res) => {
        try {
            await Restaurant.findByIdAndUpdate(req.user.restaurantId, req.body);
            res.status(200).json({ message: 'Restaurant details updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update restaurant details', error: error.message });
        }
    },
};

module.exports = restaurantController;