const Box = require('../models/Box')
const File = require('../models/File')

class FileController{
    async store(requisicao, resposta){
        const box = await Box.findById(requisicao.params.id)
        const file = await File.create({ title:requisicao.file.originalname, path:requisicao.file.key })
        
        box.files.push(file)
        await box.save()

        requisicao.sock.sockets.in(box._id).emit('file', file )

        return resposta.json(file)
    }
}

module.exports = new FileController()