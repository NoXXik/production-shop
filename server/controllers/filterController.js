const {Filter} = require('../models')
const sequelize = require("../database/database");
const {db} = require("../database/database");


class FilterController {
    async create(req, res, next) {
        try {
            await db.transaction(async () => {
                const {title, values, translit} = req.body
                const filter = await Filter.create({title, values, translit})
                return res.json({message: 'Filter was created', filter})
            })
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({message: 'Filter create Error'})
        }
    }
    async delete(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id} = req.body
                const filter = await Filter.findOne({where: {id}})
                await filter.destroy()
                return res.json({message: 'Filter was deleted'})
            })
        } catch (e) {
            return res.status(500).json({message: 'Filter create Error'})
        }
    }

    // Добавление параметра в фильтр по id, values [param1, ...]
    async addToFilter(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id, values} = req.body
                const filter = await Filter.findOne({where: {id}})
                if(!filter) {
                    return res.status(400).json({message: 'Filter not found'})
                }
                filter.values = values
                await filter.save()
                return res.json({message: 'Filter was update'})
            })
        } catch (e) {
            return res.status(500).json({message: 'Filter update Error'})
        }
    }

    async getAll(req, res, next) {
        try {
            const filters = await sequelize.query(getFilters)
            return res.json(filters[0])
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Filter not found'})
        }
    }
    async getFilters(req, res, next) {
        try {
            const filters = await Filter.findAll()
            return res.json(filters)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Filter not found'})
        }
    }

    async test(req, res, next) {
        try {
            // const {title, values, translit} = req.body
            const title = 'test'
            const values = [
                {value_title: "sdfsa", value_translit: "sdfsa"},
                {value_title: "sdfsfa", value_translit: "sdfsfa"},
                {value_title: "sfdsds", value_translit: "sfdsds"}
            ]
            const translit = 'test'

            const filter = await Filter.create({title, values, translit})
            return res.json(filter)
        } catch (e) {
            return res.status(500).json({message: 'Filter not found'})
        }
    }
}

module.exports = new FilterController()


let getFilters = `WITH ft AS (
    select title, value as values, translit from filters, json_array_elements(filters."values")
        )
    select * from ft, json_each(ft."values") WHERE key = 'value_translit'`




// вытаскивает ключ значение фильтров
// WITH ft AS (
//     select title, value, translit from filters, json_array_elements(filters."values")
//         )
//     select * from ft, json_each(ft."value") WHERE key = 'value_translit'
