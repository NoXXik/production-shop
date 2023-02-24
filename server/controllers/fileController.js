const fs = require('fs')


class fileController {
    async imageUpload(req, res) {
        try {
            const file = req.files.file
            const name = req.body.name
            let path = path(__dirname, '..', 'static', 'productImages', name)
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path)
            // const type = file.name.split('.').pop()

            return res.status(200).json({path})
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

            let path = path(__dirname, '..', 'static', 'productFiles', name)
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path)
            // const type = file.name.split('.').pop()

            return res.status(200).json({path})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Error upload file'})
        }
    }
}



module.exports = new fileController()
