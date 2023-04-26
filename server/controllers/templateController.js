const {db} = require("../database/database");
const {TemplatesCharacteristic} = require("../models");
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

class TemplateController {
    async create(req, res, next) {
        try {
            await db.transaction(async () => {
                const {title, template} = req.body
                if (!title) {
                    return res.status(400).json({message: 'Не введено название шаблона'})
                }
                const db_template = await TemplatesCharacteristic.findOne({where: {title}})
                if (db_template) {
                    return res.status(400).json({message: 'Шаблон с таким названием уже существует'})
                }
                const _template = await TemplatesCharacteristic.create({title, template})
                return res.json({message: 'Шаблон успешно создан'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async getAll(req, res, next) {
        try {
            const templates = await TemplatesCharacteristic.findAll()
            return res.json(templates)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
    async deleteById(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id} = req.params
                const db_template = await TemplatesCharacteristic.findOne({where: {id}})
                if (!db_template) {
                    return res.status(400).json({message: 'Шаблон с таким названием не найден'})
                }
                await TemplatesCharacteristic.destroy({where: {id}})
                return res.json({message: 'Шаблон успешно удален'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
}


module.exports = new TemplateController();
