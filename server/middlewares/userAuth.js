const jwt = require('jsonwebtoken')
const {db} = require("../database/database");
const {User, Reviews, UserCart, UserFavorite} = require('../models')

const userAuth = async (req, res, next) =>  {
    try {
        const authValue = req.headers.authorization
        const token = authValue.replace('Bearer ', '')

        const decoded = jwt.verify(token, 'secretkey13245')
        const dbUser = await User.findOne({where: {id: decoded.db_user.id}})
        if(!dbUser) {
            return res.status(200).json({status: 401, error: 'Auth Error: User Not Found'})
        }
        if(decoded) {
            req.user = decoded.db_user
            next()
        }
    } catch(err) {
        return res.status(200).json({status: 401, error: 'Not Authorization'})
    }
}

module.exports = userAuth;
