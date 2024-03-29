const robokassaHelper = require("../payment/robokassa/robokassa");
const {User, UserOrder, User_lk, ProductRefRelProduct, Reviews, Product, UserOrderRefProduct} = require('../models');
const {isDiscountValid, priceWithDiscount} = require("../utils/isDiscountValid");
const {db} = require("../database/database");
const axios = require("axios")
const crypto = require("crypto");
const {or} = require("sequelize");

class PaymentController {
    async createPayment(req, res, next) {
        try {
            await db.transaction(async () => {
                // Required parameters.
                const {email, phone, comment, delivery, products, full_name} = req.body
                let user = await User.findOne({where: {email}})
                if (!user) {
                    user = await User.create({email, full_name, phone})
                }
                let list_id = products.map(product => product.id)
                const db_products = await Product.findAll({where: {id: list_id, deleted: false}})
                // console.log(db_products, products)
                if (db_products.length !== products.length) {
                    return res.status(400).json({message: 'Товары не найдены'})
                }
                let productItems = [];
                let outSum = delivery.price | 0.00;
                if (products.length && products.length > 0) {
                    products.forEach(product => {
                        db_products.forEach(db_product => {
                            if (product.id === db_product.id) {
                                let price = db_product.currently_price
                                // Discount Type
                                // discount: number;
                                // expirationDate: string;
                                // startDate: string;
                                if (db_product.discount && isDiscountValid(db_product.discount.startDate, db_product.discount.expirationDate)) {
                                    price = priceWithDiscount(db_product.currently_price, db_product.discount.discount)
                                }
                                productItems.push({
                                    name: db_product.title,
                                    quantity: product.count,
                                    cost: price,
                                    sum: price * product.count,
                                    payment_method: "full_payment",
                                    payment_object: "commodity",
                                    tax: "vat20",
                                    product_id: db_product.id
                                })
                                outSum += price * product.count;
                            }
                        })
                    })
                    productItems.push({
                        name: 'Доставка',
                        quantity: 1,
                        cost: delivery.price,
                        sum: delivery.price,
                        payment_method: "full_payment",
                        payment_object: "commodity",
                        tax: "vat20",
                    })
                } else {
                    return res.status(400).json({message: 'Список товаров пуст'})
                }

                const order = await UserOrder.create({user_id: user.id, delivery, total_cost: outSum})
                let invDesc = comment;
                const receipt = {
                    sno: "osn",
                    items: productItems
                }
// Optional options.
                const options = {
                    invId: order.invId, // Your custom order ID
                    email: email, // E-Mail of the paying user
                    // outSumCurrency: 'USD', // Transaction currency
                    isTest: true, // Whether to use test mode for this specific transaction
                    userData: { // You could pass any additional data, which will be returned to you later on
                        email: email,
                        order_id: order.id
                    },
                    receipt
                };
                let prods = []
                products.forEach(prod => {
                    db_products.forEach(db_product => {
                        if (prod.id === db_product.id) {
                            let price = db_product.currently_price
                            // Discount Type
                            // discount: number;
                            // expirationDate: string;
                            // startDate: string;
                            if (db_product.discount && isDiscountValid(db_product.discount.startDate, db_product.discount.expirationDate)) {
                                price = priceWithDiscount(db_product.currently_price, db_product.discount.discount)
                            }
                            prods.push({
                                order_id: order.id,
                                product_id: db_product.id,
                                quantity: prod.count,
                                cost: price,
                                sum: price * prod.count,
                                discount: db_product.discount
                            })
                        }
                    })
                })
                const paymentUrl = await robokassaHelper.generatePaymentUrl(outSum, invDesc, options)
                await UserOrderRefProduct.bulkCreate(prods)
                return res.json({paymentUrl: paymentUrl})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async callback(req, res, next) {
        try {
            console.log(req.query)
            robokassaHelper.handleResultUrlRequest(req, res, async function (values, userData) {
                    await db.transaction(async () => {
                        const order = await UserOrder.findOne({where: {invId: values.invId}})
                        if (!order) {
                            return false
                        }
                        order.payment_status = 'Оплачен'
                        await order.save()
                        return true
                    })
                }
            )
            return res.status(200)
        } catch (e) {
            return res.status(400)
        }
    }

    async failure(req, res, next) {
        try {
            await db.transaction(async () => {
                const {InvId, OutSum} = req.body
                const order = await UserOrder.findOne({where: {invId: InvId}})
                if(!order) {
                    return res.status(400).json({message: 'Order not found'})
                }
                const out_sum = OutSum.split('.')[0]
                if(order.total_cost != out_sum) {
                    return res.status(400).json({message: 'Order sum is not valid'})
                }
                order.payment_status = 'Отменен'
                await order.save()
                return res.json({message: 'Order successfully canceled'})
            })
        } catch (e) {
            return res.status(500).json({message: 'Server error', error: JSON.stringify(e)})
        }
    }
}


module.exports = new PaymentController();
