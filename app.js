const express = require('express');
const mongoose = require('mongoose');
const productosRoutes = require('./routes/productos');  // Rutas para productos

const app = express();

// Middleware para parsear el cuerpo de las solicitudes a JSON
app.use(express.json());

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
app.use('/api', productosRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});
