// server.js - VERSIÓN CON DIAGNÓSTICO COMPLETO
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import lugarRoutes from './routes/lugares.js';
import actividadRoutes from './routes/actividades.js';
import seedRouter from './routes/seed.js';
import userRoutes from './routes/userRoutes.js';

// 🔹 IMPORTAR RUTAS TEMPORALES PARA DIAGNÓSTICO
import tempRoutes from './tempRoutes.js';

dotenv.config();

const app = express();

// Para __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares ---
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Configuración inicial ---
console.log('🚀 Iniciando EcoLibres Backend...\n');

// Verificar variables de entorno
console.log('🔧 Configuración:');
console.log('   ☁️  Cloudinary:');
console.log('     - Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || '❌ No configurado');
console.log('     - API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Configurada' : '❌ No configurada');
console.log('     - API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Configurada' : '❌ No configurada');
console.log('   🗄️  MongoDB:', process.env.MONGODB_URI ? '✅ Configurada' : '❌ No configurada');
console.log('   🚪 Puerto:', process.env.PORT || 5000);
console.log('');

// --- Conexión a MongoDB ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas');
  
  if (process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_SECRET) {
    console.log('✅ Cloudinary configurado - Listo para subir imágenes');
  } else {
    console.log('⚠️  Cloudinary no configurado - Funcionalidad de imágenes limitada');
  }
})
.catch(error => {
  console.error('❌ Error conectando a MongoDB:', error);
});

mongoose.connection.on('connected', async () => {
  console.log('🔄 Ejecutando limpieza de índices...');
  try {
    await User.initializeCleanup();
    console.log('✅ Limpieza de índices completada');
  } catch (error) {
    console.log('ℹ️ Limpieza no requerida:', error.message);
  }
});

// 🔹 DIAGNÓSTICO DE RUTAS USER
console.log('\n🔍 DIAGNÓSTICO DE RUTAS USER:');
console.log('   - userRoutes importado:', userRoutes ? '✅' : '❌');
console.log('   - Tipo de userRoutes:', typeof userRoutes);

// --- Rutas del API ---
app.use('/api/lugares', lugarRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/seed', seedRouter);

// 🔹 MONTAJE DE RUTAS USER CON DIAGNÓSTICO
console.log('🔄 Montando userRoutes en /api/user...');
app.use('/api/user', userRoutes);
console.log('✅ userRoutes montado en /api/user');

// 🔹 RUTAS TEMPORALES PARA DIAGNÓSTICO
console.log('🔄 Montando tempRoutes en /api/temp...');
app.use('/api/temp', tempRoutes);
console.log('✅ tempRoutes montado en /api/temp');

// --- Ruta de prueba / health check ---
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🚀 EcoLibres Backend funcionando!', 
    timestamp: new Date(),
    services: {
      mongodb: mongoose.connection.readyState === 1 ? '✅ Conectado' : '❌ Desconectado',
      cloudinary: (process.env.CLOUDINARY_CLOUD_NAME && 
                  process.env.CLOUDINARY_API_KEY && 
                  process.env.CLOUDINARY_API_SECRET) ? '✅ Configurado' : '⚠️ No configurado'
    },
    diagnostic: {
      userRoutes: !!userRoutes,
      tempRoutes: true
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- Ruta de estado de Cloudinary ---
app.get('/api/cloudinary-status', (req, res) => {
  const isConfigured = !!(process.env.CLOUDINARY_CLOUD_NAME && 
                         process.env.CLOUDINARY_API_KEY && 
                         process.env.CLOUDINARY_API_SECRET);
  
  res.json({ 
    configured: isConfigured,
    status: isConfigured ? '✅ Listo para subir imágenes' : '❌ No configurado',
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'No configurado',
    has_credentials: !!(process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
  });
});

// --- Ruta de información del servidor ---
app.get('/api/info', (req, res) => {
  res.json({
    name: 'EcoLibres Backend',
    version: '1.0.0',
    description: 'Plataforma de ecoturismo para Libres, Puebla',
    status: 'running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    diagnostic_routes: [
      '/api/temp/temp-test',
      '/api/temp/temp-upload'
    ]
  });
});

// --- Manejo de errores ---
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'Archivo demasiado grande. Máximo 10MB.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'Tipo de archivo no permitido. Solo imágenes.' 
      });
    }
  }
  
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// --- Ruta 404 ---
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    available_routes: [
      'GET  /api/health',
      'GET  /api/cloudinary-status', 
      'GET  /api/info',
      'GET  /api/lugares/*',
      'GET  /api/actividades/*',
      'GET  /api/seed/*',
      'ALL  /api/user/*',
      'ALL  /api/temp/* ← RUTAS DE DIAGNÓSTICO'
    ]
  });
});

// --- Puerto del servidor ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n✨ Servidor inicializado correctamente!');
  console.log('🌍 URL: http://localhost:' + PORT);
  console.log('\n📊 Endpoints disponibles:');
  console.log('   🩺  Health Check      - GET  /api/health');
  console.log('   ☁️   Cloudinary Status - GET  /api/cloudinary-status');
  console.log('   ℹ️   Server Info       - GET  /api/info');
  console.log('   👤  User Routes       - ALL  /api/user/*');
  console.log('   🗺️   Lugares           - GET  /api/lugares/*');
  console.log('   🎯  Actividades       - GET  /api/actividades/*');
  console.log('   🌱  Seed Data         - GET  /api/seed/*');
  console.log('   🔧  Diagnostic Routes - ALL  /api/temp/*');
  console.log('\n✅ ¡Servidor listo para usar!');
  console.log('💡 Prueba: http://localhost:' + PORT + '/api/health\n');
});

// --- Manejo de cierre graceful ---
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await mongoose.connection.close();
  console.log('✅ MongoDB desconectado');
  console.log('👋 Servidor terminado');
  process.exit(0);
});