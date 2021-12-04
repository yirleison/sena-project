const express = require('express')
const { crearProducto } = require('../../controladores/producto/Producto.controlador')
const productRuta = express()

productRuta.post('/producto', crearProducto)

module.exports = {
    productRuta
}