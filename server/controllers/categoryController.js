const {db: sequelize, db} = require('../database/database')
const {DataTypes, Sequelize} = require('sequelize')
const {Category, Filter} = require('../models')
class CategoryController {
    async create(req, res, next) {
        try {
            await db.transaction(async () => {
                const {parent_id, title, translit, description, image} = req.body
                const category = await Category.create({title, parent_id, translit, description, image})
                return res.json({message: 'Category was created', category})
            })
        } catch (e) {
            console.log(e)
            // return res.status(500).json({message: 'Category create Error'})
            return res.status(500)
        }
    }

    async delete(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id} = req.body
                const category = await Category.findOne({where: {id}})
                await category.destroy({force: true})
                await category.save()

                // await Category.destroy({where: {id}, force: true})
                return res.json({message: 'Category was deleted'})
            })
        } catch (e) {
            return res.status(500).json({message: 'Category delete Error'})
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await sequelize.query(sqlReq)
            return res.json(categories[0])
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: e.message})
        }
    }

    async getAllWithFilters (req, res, next) {
        try {
            const categories = await Category.findAll({include: Filter, order: [
                ['id', 'ASC']
            ]})
            // const categories = await Category.findAll({where: {}})
            return res.json(categories)
        } catch(e) {
            console.log(e)
        }
    }

    async getById(req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findOne({where: {id}, include: {model: Filter, attributes: ['id', 'title', 'translit', 'values']}})
            return res.json(category)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    async addFilter(req, res, next) {
        try {
            await db.transaction(async () => {
                const {category_id, filter_id} = req.body
                const category = await Category.findOne({where: {id: category_id}})
                const filter = await Filter.findOne({where: {id: filter_id}})
                await category.addFilter(filter)
                return res.json({message: "Filter added"})
            })
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: e.message})
        }
    }
}

module.exports = sqlReq = `WITH RECURSIVE lv_hierarchy AS (
 SELECT c.id,
        c.parent_id,
        c.title,
        c.description,
        c.translit,
        c.image,
        1 AS level,
        '/' || c.title AS path,
        array[row_number () over (order by c.title)] AS path_sort
   FROM categories c
  WHERE c.parent_id IS NULL

  UNION ALL

 SELECT c.id,
        c.parent_id,
        c.title,
        c.description,
        c.translit,
        c.image,
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
  FROM lv_hierarchy c
 ORDER BY path_sort`


module.exports = new CategoryController()
