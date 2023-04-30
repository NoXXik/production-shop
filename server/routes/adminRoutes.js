const Router = require("express");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");
const router = new Router();

router.post('/create', adminAuth, adminController.create)
router.post('/login', adminController.login)
router.get('/get-all',adminAuth, adminController.getAll)
router.get('/get-by-id/:id', adminAuth, adminController.getById)
router.delete('/delete/:id', adminAuth, adminController.deleteById)
router.get('/check-auth', adminController.checkAuth)

module.exports = router
