// routes/customerRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.use(authMiddleware); // Authentication required

// Customer-specific routes
router.get('/browse-restaurants', roleMiddleware(['customer']), customerController.browseRestaurants);
router.get('/search-menus', roleMiddleware(['customer']), customerController.searchMenus);
router.post('/place-order', roleMiddleware(['customer']), customerController.placeOrder);
router.get('/track-order/:orderId', roleMiddleware(['customer']), customerController.trackOrder);
router.get('/order-history', roleMiddleware(['customer']), customerController.orderHistory);

module.exports = router;