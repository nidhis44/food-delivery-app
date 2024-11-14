// routes/restaurantRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.use(authMiddleware); // Authentication required

// Restaurant owner-specific routes
router.post('/manage-menu', roleMiddleware(['restaurant_owner']), restaurantController.manageMenu);
router.get('/view-orders', roleMiddleware(['restaurant_owner']), restaurantController.viewOrders);
router.patch('/update-order-status/:orderId', roleMiddleware(['restaurant_owner']), restaurantController.updateOrderStatus);
router.put('/update-details', roleMiddleware(['restaurant_owner']), restaurantController.updateRestaurantDetails);

module.exports = router;