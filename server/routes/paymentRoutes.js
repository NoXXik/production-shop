const Router = require("express");
const {createPayment, callback, failure} = require("../controllers/paymentController");

const router = new Router();


router.post('/create', createPayment)
router.get('/callback', callback)
router.post('/failure', failure)
module.exports = router
