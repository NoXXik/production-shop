const Router = require("express");
const utilsController = require("../controllers/utilsController");
const adminAuth = require('../middlewares/adminAuth')
const router = new Router();


router.post('/create-swiper', adminAuth, utilsController.createSwiper)
router.delete('/delete-swiper/:id', adminAuth, utilsController.deleteSwiperById)
router.get('/get-all-swipers', utilsController.getAllSwipers)
router.patch('/update-swiper', adminAuth, utilsController.updateSwiperById)
router.get('/get-sitemap-product', utilsController.getSitemapProducts)

module.exports = router
