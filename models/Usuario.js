const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Para encriptar las contraseñas
const Schema = mongoose.Schema;

// Esquema del Usuario
const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }  // Role predeterminado (admin, user)
});

// Método para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Método para comparar las contraseñas en el login
usuarioSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
