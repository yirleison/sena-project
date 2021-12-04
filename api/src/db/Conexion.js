const mongoose = require('mongoose');

module.exports.conexion = function() {
    mongoose.connect("mongodb://localhost:27017/bdsena", function (err, db) {
        if(err) throw err;
        //Write databse Insert/Update/Query code here..     
        console.log('La conexion a la base de datos ha sido exitosa.');       
   });
}