const Router = require("express");
const productController = require("../controllers/productController")

const router = new Router()

router.get('/search', productController.searchProduct)
router.post('/', productController.create)
router.post('/get_products', productController.getProducts)
router.post('/get_products_2/:category', productController.getProducts2)
router.get('/get_products_simple', productController.getProductsSimple)


// sdfsff


module.exports = router
