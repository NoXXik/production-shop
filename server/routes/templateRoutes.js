const Router = require("express");
const TemplateController = require("../controllers/templateController")
const adminAuth = require('../middlewares/adminAuth')

const router = new Router();


router.post('/create', adminAuth, TemplateController.create)
router.get('/get-templates', TemplateController.getAll)
router.delete('/delete/:id', adminAuth, TemplateController.deleteById)

module.exports = router
