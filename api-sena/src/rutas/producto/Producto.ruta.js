const express = require('express')
const { crearProducto, listarProductos, listarProducto, actualizarProducto, eliminarProducto } = require('../../controladores/producto/Producto.controlador')
const productRuta = express()

productRuta.post('/producto', crearProducto)
productRuta.get('/productos', listarProductos)
productRuta.get('/producto/:id', listarProducto)
productRuta.put('/producto/:id', actualizarProducto)
productRuta.delete('/producto/:id', eliminarProducto)

module.exports = {productRuta}
