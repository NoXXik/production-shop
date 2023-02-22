const Router = require("express");
const fileController = require("../controllers/fileController")

const router = new Router()

router.post('/image', fileController.imageUpload)
router.post('/file', fileController.fileUpload)




module.exports = router