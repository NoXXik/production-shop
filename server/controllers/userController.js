const {User, Reviews, UserCart, UserFavorite} = require('../models')
const UserService = require('../services/userService')
const bcrypt = require('bcrypt')
const {db} = require("../database/database");
const jwt = require('jsonwebtoken')
class UserController {
    async createUser(req, res, next) {
        try {
            await db.transaction(async () => {
                const {email, password, first_name, last_name, discount} = req.body
                const db_user = await User.findOne({where: {email}})
                if(db_user) {
                    return res.status(400).json({message: 'User with email already exist'})
                }
                const hash_password = await UserService.hashPassword(password)
                const user = User.build({email, hash_password, first_name, last_name, discount})
                const cart = UserCart.build({user_id: user.id})
                const favorite = UserFavorite.build({user_id: user.id})
                await user.save()
                await cart.save()
                await favorite.save()
                return res.json({user, cart, favorite})
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
    async getUserByEmail(req, res, next) {
        try {
            const {email} = req.params
            const db_user = await User.findOne({where: {email}, include: [UserCart, UserFavorite]})

            if (!db_user) {
                return res.status(404).json({message: 'User not found'})
            }
            return res.json(db_user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
        }
    }
    async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                return res.status(404).json({status: 'error', message: 'User data incorrect'})
            }
            const db_user = await User.findOne({where: {email}, include: [UserCart, UserFavorite]})
            if (!db_user) {
                return res.status(404).json({status: 'error', message: 'User not found'})
            }
            if(!await UserService.checkPassword(password, db_user.hash_password)) {
                return res.status(400).json({status: 'error', message: 'User password is not valid'})
            }
            const token = await jwt.sign({db_user}, process.env.SECRET_KEY, {expiresIn: '1h'})
            try {
                res.cookie('accessToken', token, {httpOnly: true})
                return res.status(200).json({db_user, token})
            } catch (err) {
                console.log(err)
                return res.status(500).send({ "error": err })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({status: 'error', message: error})
        }
    }

    async helloUser(req, res, next) {
        if(req.user) {
            return res.json({message: `hello ${req?.user?.first_name}`})
        } else {
            return res.status(404).send('Something wrong')
        }
    }
}


module.exports = new UserController();
