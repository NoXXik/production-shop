const Router = require("express");
const {createPayment, callback} = require("../controllers/paymentController");

const router = new Router();


router.post('/create', createPayment)
router.get('/callback', callback)

module.exports = router
