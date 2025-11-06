const express = require('express');
const Usuario = require('../models/Usuario');  // Importamos el modelo de Usuario
const router = express.Router();
const bcrypt = require('bcryptjs');

// Ruta de registro
router.post('/register', async (req, res) => {
    const { nombre, email, password, role } = req.body;  // Agregamos el campo 'role'

    try {
        // Verificamos si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) return res.status(400).json({ message: 'Usuario ya registrado' });

        // Si no se especifica un rol, asignamos 'user' por defecto
        const nuevoRol = role || 'user';  // Si el rol no se pasa, por defecto será 'user'

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password,
            role: nuevoRol  // Asignamos el rol (por defecto será 'user')
        });

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, salt);

        // Guardar el nuevo usuario
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

        const esValido = await usuario.comparePassword(password);
        if (!esValido) return res.status(400).json({ message: 'Contraseña incorrecta' });

        // Iniciar sesión
        req.session.userId = usuario._id;
        req.session.role = usuario.role;  // Guardar el rol del usuario en la sesión
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta de logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Error al cerrar sesión' });
        res.status(200).json({ message: 'Sesion cerrada exitosamente' });
    });
});

module.exports = router;
