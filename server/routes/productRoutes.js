const Router = require("express");
const productController = require("../controllers/productController")
const adminAuth = require('../middlewares/adminAuth');

const router = new Router()

router.get('/search', productController.searchProduct)
router.get('/get_products_simple', productController.getProductsSimple)
router.get('/get_by_translit/:title_translit', productController.getProductByTranslit)

router.post('/get_products_2/:category', productController.getProducts2)
router.post('/get-products-ids', productController.getProductsByIds)
router.post('/update-product', adminAuth, productController.changeProductById)
router.post('/', adminAuth, productController.create)
router.delete('/delete/:id', adminAuth, productController.deleteById)


module.exports = router
