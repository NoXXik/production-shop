const Router = require("express");
const categoryController = require("../controllers/categoryController")

const router = new Router()

router.post('/', categoryController.create)
router.post('/add-filter', categoryController.addFilter)

router.get('/all', categoryController.getAllWithFilters)
router.get('/:id', categoryController.getById)
router.get('/', categoryController.getAll)

router.delete('/', categoryController.delete)




module.exports = router
