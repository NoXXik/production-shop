const Router = require("express");
const SupportController = require("../controllers/supportController")
const adminAuth = require('../middlewares/adminAuth')

const router = new Router();


router.post('/create-order', SupportController.create)
router.post('/change-order-status', adminAuth, SupportController.changeOrderStatus)
router.get('/get-orders', SupportController.getAll)
// router.delete('/delete/:id', adminAuth, TemplateController.deleteById)

module.exports = router
