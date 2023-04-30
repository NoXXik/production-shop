const jwt = require('jsonwebtoken')
const {db} = require("../database/database");
const {User, Reviews, UserCart, UserFavorite, Admin, AdminLogs} = require('../models')

const adminAuth = async (req, res, next) =>  {
    try {
        const authValue = req.headers.authorization
        if(!authValue) {
            return res.status(401).json({status: 401, error: 'Not authorization'})
        }
        const token = authValue.replace('Bearer ', '')

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) {
            return res.status(401).json({status: 401, error: 'Auth Error: User Not Found'})
        }
        const db_admin = await Admin.findOne({where: {id: decoded.db_admin.id}})
        if(!db_admin) {
            return res.status(401).json({status: 401, error: 'Auth Error: User Not Found'})
        }
        if(decoded && db_admin) {
            req.admin = decoded.db_admin
            // console.log(req.originalUrl)
            const logData = getLogData(req)
            await AdminLogs.create({admin_id: db_admin.id, route: req.originalUrl, log: logData})
        }
        next()
        // return res.status(400).json({message: 'Not authorization'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({status: 500, error: JSON.stringify(err)})
    }
}

function getLogData(req) {
    return {
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        body: req.body,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
        ip: req.ip,
        path: req.path,
        method: req.method
    }
}

module.exports = adminAuth;
