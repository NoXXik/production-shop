const Router = require("express");
const {getOrders, getOrderById, getOrderByInvId, getOrdersByEmail, setDeliveryStatus} = require("../controllers/orderController");
const adminAuth = require('../middlewares/adminAuth');
const router = new Router();

router.post('/get-all', adminAuth, getOrders)
router.get('/get-by-id/:id', adminAuth, getOrderById)
router.post('/get-by_invid', getOrderByInvId)
router.post('/get-by_email', getOrdersByEmail)
router.post('/set-delivery-status', adminAuth, setDeliveryStatus)

module.exports = router
