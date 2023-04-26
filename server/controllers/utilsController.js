const {db} = require("../database/database");
const {ProductSwiper, Product, ProductSwiperRefProducts} = require("../models");

class UtilsController {
    async createSwiper(req, res, next) {
        try {
            await db.transaction(async () => {
                const {title, products} = req.body
                if (!title) {
                    return res.status(400).json({message: 'Не введено название слайдера'})
                }
                const db_swiper = await ProductSwiper.findOne({where: {title}})
                if (db_swiper) {
                    return res.status(400).json({message: 'Слайдер с таким названием уже существует'})
                }
                const swiper = await ProductSwiper.create({title})
                if (products && products.length > 0) {
                    let prods = []
                    products.forEach(prod => {
                        prods.push({swiper_id: swiper.id, product_id: prod})
                    })
                    await ProductSwiperRefProducts.bulkCreate(prods)
                } else {
                    throw new Error('Не достаточное кол-во товаров')
                }
                return res.json({message: 'Слайдер успешно создан'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async getAllSwipers(req, res, next) {
        try {
            const sliders = await ProductSwiper.findAll({include: [Product]})
            return res.json(sliders)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async deleteSwiperById(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id} = req.params
                const db_swiper = await ProductSwiper.findOne({where: {id}})
                if (!db_swiper) {
                    return res.status(400).json({message: 'Слайдер с таким id не найден'})
                }
                // await ProductSwiperRefProducts.destroy({where: {swiper_id: db_swiper.id}})
                await ProductSwiper.destroy({where: {id}})
                return res.json({message: 'Слайдер успешно удален'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async updateSwiperById(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id, title, products} = req.body
                const db_swiper = await ProductSwiper.findOne({where: {id}})
                if (!db_swiper) {
                    return res.status(400).json({message: 'Слайдер с таким названием не найден'})
                }
                db_swiper.title = title
                await ProductSwiperRefProducts.destroy({where: {swiper_id: db_swiper.id}})
                if (products && products.length > 0) {
                    let prods = []
                    products.forEach(prod => {
                        prods.push({swiper_id: db_swiper.id, product_id: prod})
                    })
                    await ProductSwiperRefProducts.bulkCreate(prods)
                } else {
                    throw new Error('Не достаточное кол-во товаров')
                }
                await db_swiper.save()
                return res.json({message: 'Слайдер успешно обнавлен'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async getSitemapProducts(req, res, next) {
        try {
            const products = await Product.findAll({attributes: ['title_translit', 'category_name', 'updated_at']})
            return res.json(products)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
}


module.exports = new UtilsController();
