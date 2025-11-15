// routes/lugares.js
import express from 'express';
import Lugar from '../models/Lugar.js';
import Actividad from '../models/Actividad.js';

const router = express.Router();

// 🟢 GET - Todos los lugares activos
router.get('/', async (req, res) => {
  try {
    const lugares = await Lugar.find({ activo: true }).sort({ creadoEn: -1 });
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 GET - Lugar específico por NOMBRE con actividades
router.get('/:nombreLugar', async (req, res) => {
  try {
    const { nombreLugar } = req.params;
    
    // Buscar lugar por nombre (case insensitive, permite espacios y caracteres especiales)
    const lugar = await Lugar.findOne({ 
      nombre: { $regex: new RegExp('^' + nombreLugar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') },
      activo: true
    });

    if (!lugar) {
      return res.status(404).json({ message: "Lugar no encontrado" });
    }

    // Buscar actividades relacionadas
    const actividades = await Actividad.find({
      lugar: lugar.nombre,
      activo: true
    }).sort({ creadoEn: -1 });

    res.json({ lugar, actividades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 GET - Lugar específico por ID con actividades
router.get('/id/:id', async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id);
    if (!lugar) return res.status(404).json({ message: "Lugar no encontrado" });

    const actividades = await Actividad.find({
      lugar: lugar.nombre,
      activo: true
    }).sort({ creadoEn: -1 });

    res.json({ lugar, actividades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟡 POST - Crear lugar
router.post('/', async (req, res) => {
  try {
    const nuevoLugar = new Lugar(req.body);
    const lugarGuardado = await nuevoLugar.save();
    res.status(201).json(lugarGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟠 PUT - Actualizar lugar
router.put('/:id', async (req, res) => {
  try {
    const lugarActualizado = await Lugar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(lugarActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔴 DELETE - Eliminar lugar
router.delete('/:id', async (req, res) => {
  try {
    await Lugar.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lugar eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;