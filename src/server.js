const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')


const app = express()
app.use(cors())

const server = require('http').Server(app)
const sock = require('socket.io')(server)

sock.on('connection', socket => { socket.on('connectRoom', box => { socket.join(box) })})

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://juanfarias:2911@cluster0.ovxwf5f.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser:true })

app.use( (requisicao, resposta, prox) => { requisicao.sock = sock 
    return prox() } )


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))

app.use(require("./routes"))
server.listen( process.env.PORT || 4000)