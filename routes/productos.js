const express = require('express');
const Producto = require('../models/Producto');  // Importa el modelo de Producto
const router = express.Router();

// Crear un nuevo producto
router.post('/productos', async (req, res) => {
    const { nombre, precio, descripcion, imagen } = req.body;
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
        res.status(200).json(productos);  // Retorna todos los productos
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

module.exports = router;
