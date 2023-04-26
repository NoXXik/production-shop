const Router = require("express");
const filterController = require("../controllers/filterController")
const adminAuth = require('../middlewares/adminAuth');

const router = new Router()

router.get('/getAll', filterController.getAll)
router.get('/getFilters', filterController.getFilters)
router.get('/test', filterController.test)
router.post('/', adminAuth, filterController.create)
router.delete('/', adminAuth, filterController.delete)
router.post('/update', adminAuth, filterController.addToFilter)



module.exports = router
