const Router = require("express");
const adminController = require("../controllers/adminController");
const router = new Router();

router.post('/create', adminController.create)
router.post('/login', adminController.login)
router.get('/get-all', adminController.getAll)
router.get('/get-by-id/:id', adminController.getById)
router.delete('/delete/:id', adminController.deleteById)

module.exports = router
