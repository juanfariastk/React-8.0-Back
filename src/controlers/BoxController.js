const Box = require('../models/Box')

class BoxController{
    async store(requisicao, resposta){
        const box_store = await Box.create(requisicao.body)
        return resposta.json(box_store)
    }

    async show(requisicao, resposta){
        const box = await Box.findById(requisicao.params.id).populate({ path:"files", options: {sort:{createdAt:-1}}})
        return resposta.json(box)
    }
}

module.exports = new BoxController()