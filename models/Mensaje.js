const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema de Mensaje
const mensajeSchema = new Schema({
    nombre: { type: String, required: true },
    mensaje: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
