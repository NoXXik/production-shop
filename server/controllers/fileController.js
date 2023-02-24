const fs = require('fs')
const path = require('path')

class fileController {
    async imageUpload(req, res) {
        try {
            const file = req.files.file
            const name = req.body.name
            let imagePath = path.join(__dirname, '..', 'static', 'productImages', name)
            if (fs.existsSync(imagePath)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(imagePath)
            // const type = file.name.split('.').pop()

            return res.status(200).json({path: imagePath})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Error upload file'})
        }
    }

    async fileUpload(req, res) {
        try {
            const file = req.files.file
            const name = req.body.name
            console.log(req)

            let filePath = path.join(__dirname, '..', 'static', 'productFiles', name)
            if (fs.existsSync(filePath)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(filePath)
            // const type = file.name.split('.').pop()

            return res.status(200).json({path: filePath})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Error upload file'})
        }
    }
}



module.exports = new fileController()
