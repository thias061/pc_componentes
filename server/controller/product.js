const Product = require('../models/product')

function getProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: 'Error al consultar el producto' })
        if (!product) return res.status(404).send({ message: 'El producto no existe' })
        res.status(200).send({ product })
    })
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: 'Error al consultar los productos' })
        if (!products) return res.status(404).send({ message: 'No hay productos' })
        res.status(200).send({ products })
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({ message: 'Error tratando de encontrar el producto' })
        res.status(200).send({ productUpdated })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({ message: 'Error tratando de encontrar el producto' })
        if (!product) res.status(404).send({ message: 'El producto no existe' })

        product.remove(err => {
            if (err) res.status(500).send({ message: 'Error tratando de eliminar el producto' })
            res.status(200).send({ product })
        })
    })
}

function saveProduct(req, res) {
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: 'Error al mandar msg a bdd' })

        res.status(200).send({ product: productStored })
    })
}

module.exports = {
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    saveProduct
}