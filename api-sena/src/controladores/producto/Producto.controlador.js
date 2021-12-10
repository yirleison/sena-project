const ProductoModelo = require('../../modelos/producto/Producto.modelo')
const crearProducto = (req, res) => {
    let productoModelo = new ProductoModelo()
    let body = req.body
    productoModelo.nombre = body.nombre
    productoModelo.descripcion = body.descripcion
    productoModelo.cantidad = body.cantidad
    productoModelo.valorUnitario = body.valorUnitario

    productoModelo.save(async (error, productSave) => {
        if (error) {
            res.status(500).send({
                message: "No se ha podido realizar el registro."
            })
        }
        else {
            res.status(200).send({
                message: "Registro realizado exitosamente .",
                data: productSave
            })
        }
    })
}

const listarProductos = (req, res) => {
    ProductoModelo.find({}, (error, listProductos) => {
        if (error) {
            res.status(500).send({
                message: "No se ha podido realizar la consulta."
            })
        }
        else if (!listProductos) {
            res.status(500).send({
                message: "La consulta no arrojo datos"
            })
        }
        else {
            res.status(200).send({
                data: listProductos
            })
        }
    })
}

const listarProducto = (req, res) => {
    const id = req.params.id
    ProductoModelo.findById(id, (error, product) => {
        if (error) {
            res.status(500).send({
                message: "No se ha podido realizar la consulta."
            })
        }
        else if (!product) {
            res.status(500).send({
                message: "La consulta no arrojo datos"
            })
        }
        else {
            res.status(200).send({
                data: product
            })
        }
    })
}

const actualizarProducto = (req, res) => {
    const id = req.params.id
    let body = req.body
    ProductoModelo.findByIdAndUpdate(id, body,{new : true}, (error, productUpdate) => {
        if (error) {
            res.status(500).send({
                message: "No se ha podido realizar la consulta."
            })
        }
        else if (!productUpdate) {
            res.status(500).send({
                message: "La consulta no arrojo datos"
            })
        }
        else {
            res.status(200).send({
                data: productUpdate
            })
        }
    })
}

const eliminarProducto = (req, res) => {
    const id = req.params.id
    ProductoModelo.findByIdAndRemove(id, (error, productRemove) => {
        if (error) {
            res.status(500).send({
                message: "No se ha podido realizar la consulta."
            })
        }
        else if (!productRemove) {
            res.status(500).send({
                message: "La consulta no arrojo datos"
            })
        }
        else {
            res.status(200).send({
                message: "Producto eliminado con exito."
            })
        }
    })
}


module.exports = {
    crearProducto,
    listarProductos,
    listarProducto,
    actualizarProducto,
    eliminarProducto
}