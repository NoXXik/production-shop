const Router = require("express");
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const filterRoutes = require('./filterRoutes')
const basketRoutes = require('./basketRoutes')
const fileRoutes = require('./fileRoutes')
const paymentRoutes = require('./paymentRoutes')
const userRoutes = require('./userRoutes')
const orderRoutes = require('./orderRoutes')
const templateRoutes = require('./templateRoutes')
const utilRoutes = require('./utilRoutes')
const adminRoutes = require('./adminRoutes')
const supportRoutes = require('./supportRoutes')



const router = new Router()

router.use('/product', productRoutes)
router.use('/category', categoryRoutes)
router.use('/filter', filterRoutes)
router.use('/upload', fileRoutes)
router.use('/payment', paymentRoutes)
router.use('/order', orderRoutes)
router.use('/user', userRoutes)
router.use('/admin', adminRoutes)
router.use('/template', templateRoutes)
router.use('/utils', utilRoutes)
router.use('/support', supportRoutes)




module.exports = router
