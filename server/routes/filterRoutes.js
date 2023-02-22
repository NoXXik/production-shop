const Router = require("express");
const filterController = require("../controllers/filterController")

const router = new Router()

router.get('/getAll', filterController.getAll)
router.get('/getFilters', filterController.getFilters)
router.get('/test', filterController.test)
router.post('/', filterController.create)
router.delete('/', filterController.delete)
router.post('/update', filterController.addToFilter)



module.exports = router
