
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

//Connexion a bdd
mongoose.connect(config.db, (err, res) => {
    if(err) throw err
    console.log('Conexion OK')

    app.listen(config.port, () => {
        console.log(`API rest corriendo en el puerto ${config.port}`)
    })
})

