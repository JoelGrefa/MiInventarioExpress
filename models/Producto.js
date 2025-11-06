const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de Producto
const productoSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true }  // Guardar el nombre de la imagen
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
