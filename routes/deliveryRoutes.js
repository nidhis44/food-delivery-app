// routes/deliveryRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const deliveryController = require('../controllers/deliveryController');

const router = express.Router();

router.use(authMiddleware); // Authentication required

// Delivery personnel-specific routes
router.get('/available-deliveries', roleMiddleware(['delivery_personnel']), deliveryController.viewAvailableDeliveries);
router.patch('/accept-delivery/:orderId', roleMiddleware(['delivery_personnel']), deliveryController.acceptDelivery);
router.patch('/update-delivery-status/:orderId', roleMiddleware(['delivery_personnel']), deliveryController.updateDeliveryStatus);
router.put('/set-availability', roleMiddleware(['delivery_personnel']), deliveryController.setAvailability);

module.exports = router;