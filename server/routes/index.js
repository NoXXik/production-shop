const Router = require("express");
const productRoutes = require('./productRoutes')
const categoryRoutes = require('./categoryRoutes')
const filterRoutes = require('./filterRoutes')
const orderRoutes = require('./orderRoutes')
const basketRoutes = require('./basketRoutes')
const fileRoutes = require('./fileRoutes')


const router = new Router()
//
//
router.use('/product', productRoutes)
router.use('/category', categoryRoutes)
router.use('/filter', filterRoutes)
router.use('/upload', fileRoutes)

module.exports = router
