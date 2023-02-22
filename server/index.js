require('dotenv').config()
const express = require('express')
const sequelize = require('./database/database')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
// const errorMiddleware = require('./middlewares/ErrorHandlingMiddleware')
const path = require('path')
const PORT = 5000

const {User, Basket, BasketDevice, Category, Product} = require('./models/models')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Error handling
// app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on ${PORT} port`))
        // DataAdd()
        // SQLtest()
    } catch (e) {
        console.log(e)
    }
}

start()

const SQLtest = async () => {
    // console.log(await Product.findAll({where: {categoryId: 6}}))
    const resp = await sequelize.query(sqlReq)
    console.log(resp[0])
    resp[0].map(item => item.level === 2 ? console.log(item) : false)
}

const DataAdd = async () => {
    await User.create({email: 'ildar', password: "1234"})
    await User.create({email: 'ilmir', password: "5456"})
    await User.create({email: 'maksim', password: "13436234"})
    await User.create({email: 'oleg', password: "12gfdgd34"})
    await User.create({email: 'ilgiz', password: "1fdg234"})
    await User.create({email: 'ilshat', password: "1g234"})
    //
    await Basket.create({userId: 1})
    await Basket.create({userId: 2})
    await Basket.create({userId: 3})
    await Basket.create({userId: 4})
    await Basket.create({userId: 5})
    await Basket.create({userId: 6})

    await Category.create({title: 'Camera', parent_id: null})
    await Category.create({title: 'Registration', parent_id: null})
    await Category.create({title: 'IP-cameras', parent_id: 1})
    await Category.create({title: 'AHD-cameras', parent_id: 1})
    await Category.create({title: 'IP-cameras PRO', parent_id: 1})
    await Category.create({title: 'IP-registration', parent_id: 2})
    await Category.create({title: 'AHD-registration', parent_id: 2})
    await Category.create({title: 'IP-registration PRO', parent_id: 6})
    await Category.create({title: 'IP-registration Unlimit', parent_id: 6})

    await Product.create({title: 'IP-camera 1', price: 1224, categoryId: 3})
    await Product.create({title: 'IP-camera 2', price: 43563, categoryId: 3})
    await Product.create({title: 'IP-camera Pro 1', price: 1224, categoryId: 5})
    await Product.create({title: 'AHD-camera 1', price: 1224, categoryId: 4})

    await Product.create({title: 'AHD-registration PRO 1', price: 1224, categoryId: 7})
    await Product.create({title: "AHD-registration 1", price: 1224, categoryId: 7})
    await Product.create({title: 'IP-registration PRO 1', price: 1224, categoryId: 8})
    await Product.create({title: 'IP-registration unlimit 1', price: 1224, categoryId: 9})


}

const sqlReq = `WITH RECURSIVE lv_hierarchy AS (
 SELECT c.id,
        c.parent_id,
        c.title,
        1 AS level,
        '/' || c.title AS path,
        array[row_number () over (order by c.title)] AS path_sort
   FROM categories c
  WHERE c.parent_id IS NULL

  UNION ALL

 SELECT c.id,
        c.parent_id,
        c.title,
        p.level + 1 AS level,
        p.path || '/' || c.title AS path,
        p.path_sort || row_number () over (partition by c.parent_id order by c.title) AS path_sort
   FROM lv_hierarchy p,
        categories c
  WHERE c.parent_id = p.id
)
SELECT *,
    not exists (
    SELECT 1
FROM categories ch
WHERE ch.parent_id = c.id
) AS is_leaf
 FROM lv_hierarchy
ORDER BY path_sort`


// Create Users =========================

// const user_1 = await User.create({email: 'ildar', password: "1234"})
// const user_2 = await User.create({email: 'ilmir', password: "5456"})
// const user_3 = await User.create({email: 'maksim', password: "13436234"})
// const user_4 = await User.create({email: 'oleg', password: "12gfdgd34"})
// const user_5 = await User.create({email: 'ilgiz', password: "1fdg234"})
// const user_6 = await User.create({email: 'ilshat', password: "1g234"})


// Create categories ========

// await Category.create({title: 'Camera', parent_id: null})
// await Category.create({title: 'Registration', parent_id: null})
// await Category.create({title: 'IP-cameras', parent_id: 1})
// await Category.create({title: 'AHD-cameras', parent_id: 1})
// await Category.create({title: 'IP-cameras PRO', parent_id: 1})
// await Category.create({title: 'IP-registration', parent_id: 2})
// await Category.create({title: 'AHD-registration', parent_id: 2})
// await Category.create({title: 'IP-registration PRO', parent_id: 6})
// await Category.create({title: 'IP-registration Unlimit', parent_id: 6})


// await Basket.create({basketId: 1})
// await Basket.create({basketId: 2})
// await Basket.create({basketId: 3})
// await Basket.create({basketId: 4})
// await Basket.create({basketId: 5})
// await Basket.create({basketId: 6})

// WITH RECURSIVE cats AS (
//     SELECT id, title, parent_id
// FROM categories
// WHERE parent_id = 2
//
// UNION
//
// SELECT categories.id, categories.title, categories.parent_id
// FROM categories
// JOIN cats
// ON categories.parent_id = cats.id
// )
//
// SELECT * FROM cats;


// SQL запрос для получения пути до родительской категории

// WITH RECURSIVE lv_hierarchy AS (
//     SELECT c.id,
//     c.parent_id,
//     c.title,
//     1 AS level,
// '/' || c.title AS path
// FROM categories c
// WHERE c.parent_id IS NULL
//
// UNION ALL
//
// SELECT c.id,
//     c.parent_id,
//     c.title,
// p.level + 1 AS level,
// p.path || '/' || c.title AS path
// FROM lv_hierarchy p,
//     categories c
// WHERE c.parent_id = p.id
// )
// SELECT *
// FROM lv_hierarchy

// Готовая версия SQL запроса получения категорий товаров
// WITH RECURSIVE lv_hierarchy AS (
//     SELECT c.id,
//     c.parent_id,
//     c.title,
//     1 AS level,
// '/' || c.title AS path,
//     array[row_number () over (order by c.title)] AS path_sort
// FROM categories c
// WHERE c.parent_id IS NULL
//
// UNION ALL
//
// SELECT c.id,
//     c.parent_id,
//     c.title,
// p.level + 1 AS level,
// p.path || '/' || c.title AS path,
// p.path_sort || row_number () over (partition by c.parent_id order by c.title) AS path_sort
// FROM lv_hierarchy p,
//     categories c
// WHERE c.parent_id = p.id
// )
// SELECT *,
//     not exists (
//     SELECT 1
// FROM categories ch
// WHERE ch.parent_id = c.id
// ) AS is_leaf
// FROM lv_hierarchy c
// ORDER BY path_sort

const i = [
    {
        id: 1,
        parent_id: null,
        title: 'Camera',
        level: 1,
        path: '/Camera',
        path_sort: [Array]
    },
    {
        id: 4,
        parent_id: 1,
        title: 'AHD-cameras',
        level: 2,
        path: '/Camera/AHD-cameras',
        path_sort: [Array]
    },
    {
        id: 3,
        parent_id: 1,
        title: 'IP-cameras',
        level: 2,
        path: '/Camera/IP-cameras',
        path_sort: [Array]
    },
    {
        id: 5,
        parent_id: 1,
        title: 'IP-cameras PRO',
        level: 2,
        path: '/Camera/IP-cameras PRO',
        path_sort: [Array]
    },
    {
        id: 2,
        parent_id: null,
        title: 'Registration',
        level: 1,
        path: '/Registration',
        path_sort: [Array]
    },
    {
        id: 7,
        parent_id: 2,
        title: 'AHD-registration',
        level: 2,
        path: '/Registration/AHD-registration',
        path_sort: [Array]
    },
    {
        id: 6,
        parent_id: 2,
        title: 'IP-registration',
        level: 2,
        path: '/Registration/IP-registration',
        path_sort: [Array]
    },
    {
        id: 8,
        parent_id: 6,
        title: 'IP-registration PRO',
        level: 3,
        path: '/Registration/IP-registration/IP-registration PRO',
        path_sort: [Array]
    },
    {
        id: 9,
        parent_id: 6,
        title: 'IP-registration Unlimit',
        level: 3,
        path: '/Registration/IP-registration/IP-registration Unlimit',
        path_sort: [Array]
    }
]
