const Router = require("express");
const categoryController = require("../controllers/categoryController")
const adminAuth = require('../middlewares/adminAuth');
const router = new Router()



router.get('/all', categoryController.getAllWithFilters)
router.get('/:id', categoryController.getById)
router.get('/', categoryController.getAll)
router.post('/', adminAuth, categoryController.create)
router.post('/add-filter', adminAuth, categoryController.addFilter)
router.delete('/', adminAuth, categoryController.delete)




module.exports = router
