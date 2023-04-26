const {db} = require("../database/database");
const {SupportOrder, UserOrder, User, Product} = require("../models");
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

class SupportController {
    async create(req, res, next) {
        try {
            await db.transaction(async () => {
                const {email,
                    phone,
                    full_name,
                    title,
                    text} = req.body
                const order = await SupportOrder.create({email,
                    phone,
                    full_name,
                    title,
                    text})
                return res.json({message: 'Ордер успешно создан'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async getAll(req, res, next) {
        try {
            const {limit = 10, page = 1} = req.body;
            const offset = (page * limit) - limit;
            const orders = await SupportOrder.findAndCountAll({
                order: [
                    [db.literal('created_at'), 'DESC']
                ],
                offset: offset,
                limit: limit,
            })
            return res.json(orders)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
    async changeOrderStatus(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id, status} = req.body;
                const order = await SupportOrder.findOne({
                    where: {id}
                })
                if (!order) {
                    return res.status(404).json({message: 'Заявка не найдена'})
                }
                if(status === 'В обработке') {
                    order.status = 'В обработке'
                } else if(status === 'Отменен') {
                    order.status = 'Отменен'
                } else if(status === 'Завершен') {
                    order.status = 'Завершен'
                } else if(status === 'В очереди') {
                    order.status = 'В очереди'
                } else {
                    return res.status(400).json({message: 'Не правильный тип статуса'})
                }
                await order.save()
                return res.json({message: 'Статус заявки успешно изменен'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
}


module.exports = new SupportController();
