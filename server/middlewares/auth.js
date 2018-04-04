'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'No tienes derechos'})
    }

    const token = req.headers.authorization.split(" ")[1]
    const payLoad = jwt.decode(token, config.SECRET_TOKEN)

    if(payLoad.exp <= moment().unix()){
        return res.status(401).send({ message: `El token ha expirado`})
    }

    req.user = payLoad.sub
    next()
}

module.exports = isAuth