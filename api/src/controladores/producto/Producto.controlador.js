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


module.exports = {
    crearProducto
}