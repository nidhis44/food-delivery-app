// controllers/adminController.js
const User = require('../models/userModel');
const Order = require('../models/orderModel');

const adminController = {
    manageUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to manage users', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.userId, req.body);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user', error: error.message });
        }
    },

    deactivateUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.userId, { active: false });
            res.status(200).json({ message: 'User deactivated' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to deactivate user', error: error.message });
        }
    },

    viewAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
        }
    },

    manageOrder: async (req, res) => {
        try {
            await Order.findByIdAndUpdate(req.params.orderId, req.body);
            res.status(200).json({ message: 'Order managed successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to manage order', error: error.message });
        }
    },

    generateReports: async (req, res) => {
        try {
            // Generate report logic (e.g., popular restaurants, delivery times)
            res.status(200).json({ message: 'Report generated' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to generate report', error: error.message });
        }
    },

    monitorPlatformActivity: async (req, res) => {
        try {
            // Platform activity logic
            res.status(200).json({ message: 'Platform activity monitored' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to monitor platform activity', error: error.message });
        }
    },

};

module.exports = adminController;