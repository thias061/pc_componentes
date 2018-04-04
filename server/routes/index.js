'use strict'

const express = require('express')
const productCtrl = require('../controller/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/product', productCtrl.saveProduct)
// api.get('/private', auth.isAuth, function(req, res) {
//     res.status(200).send({ message: `Tienes acceso`})
// })

module.exports = api