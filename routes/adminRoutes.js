// routes/adminRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authMiddleware); // Authentication required

// Administrator-specific routes
router.get('/manage-users', roleMiddleware(['admin']), adminController.manageUsers);
router.patch('/update-user/:userId', roleMiddleware(['admin']), adminController.updateUser);
router.delete('/deactivate-user/:userId', roleMiddleware(['admin']), adminController.deactivateUser);
router.get('/view-orders', roleMiddleware(['admin']), adminController.viewAllOrders);
router.patch('/manage-order/:orderId', roleMiddleware(['admin']), adminController.manageOrder);
router.get('/generate-reports', roleMiddleware(['admin']), adminController.generateReports);
router.get('/monitor-activity', roleMiddleware(['admin']), adminController.monitorPlatformActivity);

module.exports = router;