const express = require('express');
const mongoose = require('mongoose');
const productosRoutes = require('./routes/productos');  // Ruta de productos
const path = require('path');  // Para manejar rutas de archivos
const app = express();

// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Usar las rutas de productos
app.use('/api', productosRoutes);  // Prefijo /api para las rutas de productos

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});
