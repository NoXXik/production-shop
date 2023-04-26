const {db} = require("../database/database");
const {Admin, User, UserCart, UserFavorite} = require("../models");
const {DataTypes} = require("sequelize");
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

class AdminController {
    async create(req, res, next) {
        try {
            await db.transaction(async () => {
                const {login, password, email, first_name, last_name, access, is_super_admin} = req.body
                const db_admin = await Admin.findOne({where: {login}})
                if (db_admin) {
                    return res.status(400).json({message: 'Admin with email already exist'})
                }
                const hash_password = await UserService.hashPassword(password)
                const admin = Admin.build({login, hash_password, email, first_name, last_name, access, is_super_admin})
                await admin.save()
                return res.json({message: 'Администратор успешно зарегестрирован'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: JSON.stringify(error)})
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            if (!login || !password) {
                return res.status(400).json({status: 'error', message: 'Admin data incorrect'})
            }
            const db_admin = await Admin.findOne({where: {login}})
            if (!db_admin) {
                return res.status(404).json({status: 'error', message: 'Admin not found'})
            }
            if (!await UserService.checkPassword(password, db_admin.hash_password)) {
                return res.status(400).json({status: 'error', message: 'Admin password is not valid'})
            }
            const token = await jwt.sign({db_admin}, 'secretkey13245', {expiresIn: '1d'})
            db_admin.hash_password = undefined
            return res.json({data: db_admin, token})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: JSON.stringify(error)})
        }
    }

    async getAll(req, res, next) {
        try {
            const admins = await Admin.findAll({attributes: { exclude: ['hash_password'] }})
            return res.json(admins)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: JSON.stringify(error)})
        }
    }

    async deleteById(req, res, next) {
        try {
            await db.transaction(async () => {
                const {id} = req.params
                const db_admin = await Admin.findOne({where: {id}})
                if (!db_admin) {
                    return res.status(400).json({message: 'Админ с таким id не найден'})
                }
                await db_admin.destroy()
                // await ProductSwiperRefProducts.destroy({where: {swiper_id: db_swiper.id}})
                return res.json({message: 'Админ успешно удален'})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }

    async getById(req, res, next) {
        try {
            const {id} = req.params
            const db_admin = await Admin.findOne({where: {id}, attributes: { exclude: ['hash_password'] }})
            if (!db_admin) {
                return res.status(400).json({message: 'Админ с таким id не найден'})
            }
            return res.json(db_admin)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
}

module.exports = new AdminController();
