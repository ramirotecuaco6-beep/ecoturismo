// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import lugarRoutes from './routes/lugares.js';
import actividadRoutes from './routes/actividades.js';
import seedRouter from './routes/seed.js';

dotenv.config();

const app = express();

// --- Middlewares ---
app.use(cors({
  origin: "http://localhost:5173" // Origen del frontend (Vite)
}));
app.use(express.json());

// --- Conexión a MongoDB ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(error => console.error('❌ Error conectando a MongoDB:', error));

// --- Rutas del API ---
app.use('/api/lugares', lugarRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/seed', seedRouter);

// --- Ruta de prueba / health check ---
app.get('/api/health', (req, res) => {
  res.json({ message: '🚀 Backend funcionando!', timestamp: new Date() });
});

// --- Puerto del servidor ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
