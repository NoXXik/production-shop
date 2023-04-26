const Router = require("express");
const userController = require("../controllers/userController");
const userAuth = require('../middlewares/userAuth')
const router = new Router();


router.post('/create', userController.createUser)
router.get('/get-user/:email', userController.getUserByEmail)
router.post('/login', userController.loginUser)
router.get('/hello-user', userAuth, userController.helloUser)
module.exports = router
