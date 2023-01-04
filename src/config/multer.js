const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp'),
    storage: multer.diskStorage({ destination: (requisicao, arquivo , call) =>{
        call(null, path.resolve(__dirname, '..', '..', 'temp'))
    }, filename: (requisicao, arquivo, call) => {
        crypto.randomBytes(16, (err, hash) => {
            if (err) call(err)

            arquivo.key = `${hash.toString('hex')}-${arquivo.originalname}`

            call(null, arquivo.key )
        } )
    } })

}