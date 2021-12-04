const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Productschema = new Schema({
    nombre: String,
    descripcion: String,
    cantidad: Number,
    valorUnitario: Number
})

module.exports = mongoose.model('producto', Productschema)