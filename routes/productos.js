const express = require('express');
const Producto = require('../models/Producto');  // Importa el modelo de Producto
const multer = require('multer');  // Importa Multer
const router = express.Router();

// Configuración de Multer para la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Guardar las imágenes en la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Usar un nombre único para evitar conflictos
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];  // Solo imágenes permitidas
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Solo se permiten imágenes (jpg, jpeg, png)'), false);  // Validación de tipo
    }
    if (file.size > 5 * 1024 * 1024) {  // Limitar el tamaño del archivo a 5MB
        return cb(new Error('El archivo es demasiado grande, el límite es de 5MB'), false);
    }
    cb(null, true);  // Si pasa las validaciones, permitir la carga
};

const upload = multer({ storage: storage, fileFilter: fileFilter });  // Configurar Multer

// Crear un nuevo producto con carga de imagen
router.post('/productos', upload.single('imagen'), async (req, res) => {
    const { nombre, precio, descripcion } = req.body;
    const imagen = req.file ? req.file.filename : null;  // Si la imagen fue cargada, obtener su nombre

    const nuevoProducto = new Producto({ nombre, precio, descripcion, imagen });

    try {
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);  // Retorna el producto creado
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        
        // Agregar la URL completa de la imagen
        const productosConUrl = productos.map(producto => {
            producto.imagen = `http://localhost:3000/uploads/${producto.imagen}`;
            return producto;
        });

        res.status(200).json(productosConUrl);  // Retorna todos los productos con la URL completa de la imagen
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un producto por su ID
router.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        producto.imagen = `http://localhost:3000/uploads/${producto.imagen}`;  // Agregar URL completa
        res.status(200).json(producto);  // Retorna el producto encontrado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto
router.put('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);  // Retorna el producto actualizado
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un producto
router.delete('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado' });  // Mensaje de eliminación exitosa
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;  // Asegúrate de exportar las rutas
