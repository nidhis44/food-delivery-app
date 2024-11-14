// controllers/customerController.js
const Restaurant = require('../models/restaurantModel');
const Order = require('../models/orderModel');

const customerController = {
    browseRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.find();
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch restaurants', error: error.message });
        }
    },

    searchMenus: async (req, res) => {
        try {
            const { query } = req.query;
            const results = await Restaurant.find({ 'menu.name': new RegExp(query, 'i') });
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ message: 'Menu search failed', error: error.message });
        }
    },

    placeOrder: async (req, res) => {
        try {
            const { items, restaurantId } = req.body;
            const newOrder = await Order.create({ items, restaurantId, customerId: req.user.id, status: 'Placed' });
            res.status(201).json({ message: 'Order placed successfully', order: newOrder });
        } catch (error) {
            res.status(500).json({ message: 'Order placement failed', error: error.message });
        }
    },

    trackOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.orderId);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Failed to track order', error: error.message });
        }
    },

    orderHistory: async (req, res) => {
        try {
            const orders = await Order.find({ customerId: req.user.id });
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve order history', error: error.message });
        }
    },
};

module.exports = customerController;