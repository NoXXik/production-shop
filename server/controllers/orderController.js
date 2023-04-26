const robokassaHelper = require("../payment/robokassa/robokassa");
const {User, UserOrder, User_lk, ProductRefRelProduct, Reviews, Product, UserOrderRefProduct} = require('../models');
const {db: sequelize} = require("../database/database");
const { Op } = require("sequelize");
class OrderController {
    async getOrders(req, res, next) {
        try {
            const {limit = 10, page = 1} = req.body;
            const offset = (page * limit) - limit;
            const orders = await UserOrder.findAndCountAll({
                include: [User, Product],
                order: [
                    [sequelize.literal('created_at'), 'DESC']
                ],
                offset: offset,
                limit: limit,
            })
            orders.count = orders.count/2;
            return res.json(orders)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    async getOrderById(req, res, next) {
        try {
            const {id} = req.params;
            const order = await UserOrder.findOne({where: {id}, include: [User, Product]})
            return res.json(order)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    async getOrderByInvId(req, res, next) {
        try {
            const {id} = req.body;
            const order = await UserOrder.findOne({where: {invId: id}, include: [User, Product]})
            return res.json(order)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
    async getOrdersByEmail(req, res, next) {
        try {
            const {email, page = 1, limit = 10} = req.body;
            const offset = (page * limit) - limit;
            const user = await User.findOne({where: {email}, include: [User, Product]})
            if(!user) {
                return res.status(400).json({message: 'User not found'})
            }
            const orders = await UserOrder.findAndCountAll({
                where: {user_id: user.id},
                include: [User, Product],
                order: [
                    [sequelize.literal('created_at'), 'DESC']
                ],
                offset: offset,
                limit: limit,
            })
            orders.count = orders.count/2;
            return res.json(orders)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }

    async setDeliveryStatus(req, res, next) {
        const {invId, status} = req.body
        const order = await UserOrder.findOne({where: {invId}, include: [User, Product]})
        if(status === "В пути") {
            order.delivery_status = "В пути"
        } else if (status === "Отменен") {
            order.delivery_status = "Отменен"
        } else if (status === "Доставлен") {
            order.delivery_status = "Доставлен"
        } else if (status === "Ожидает отправки") {
            order.delivery_status = "Ожидает отправки"
        } else {
            return res.status(400).json({message: "Incorrect delivery status"})
        }
        await order.save()
        return res.json(order)
    }
}


module.exports = new OrderController();
