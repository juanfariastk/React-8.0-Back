const express = require('express')
const multer = require('multer')
const config_multer = require('./config/multer')

const routes = express.Router()
const box_controller =  require('./controlers/BoxController')
const files_controller = require('./controlers/FileController')



routes.post("/boxes", box_controller.store)
routes.get("/boxes/:id",box_controller.show )
routes.post("/boxes/:id/files", multer(config_multer).single('file'), files_controller.store )

module.exports = routes

