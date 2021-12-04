const express = require('express')
const bodyParser = require('body-parser');
const { productRuta } = require('./src/rutas/producto/Producto.ruta')
const bd = require('./src/db/Conexion')
const app = express()
const PORT = process.env.PORT | 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept,typepayment, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use(productRuta)

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+ PORT);
    bd.conexion()
} )