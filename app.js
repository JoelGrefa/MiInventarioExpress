const express = require('express');
const mongoose = require('mongoose');
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');  // Ruta de autenticación
const path = require('path');
const session = require('express-session');  // Para gestionar las sesiones
const http = require('http');
const socketIo = require('socket.io');
const Mensaje = require('./models/Mensaje');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

// Configuración de la sesión
app.use(session({
    secret: 'miSecretKey',
    resave: false,
    saveUninitialized: true
}));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/miInventario', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((error) => {
    console.error('Error al conectar con MongoDB', error);
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de productos y autenticación
app.use('/api', productosRoutes);
app.use('/auth', authRoutes);  // Usar las rutas de autenticación

// Crear un servidor HTTP para usarlo con Socket.io
const server = http.createServer(app);

// Configurar Socket.io
const io = socketIo(server);

// Configurar el chat en tiempo real
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('mensaje', async (data) => {
        console.log('Mensaje recibido:', data);
        const [nombre, mensaje] = data.split(': ');
        const nuevoMensaje = new Mensaje({ nombre, mensaje });
        await nuevoMensaje.save();
        io.emit('mensaje', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Ruta para obtener historial de mensajes
app.get('/historial', async (req, res) => {
    try {
        const mensajes = await Mensaje.find().sort({ fecha: 1 });
        res.status(200).json(mensajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Iniciar el servidor con Socket.io
server.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});
