// routes/userRoutes.js
import express from "express";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import UserPhoto from "../models/UserPhoto.js";
import User from "../models/User.js";

const router = express.Router();
console.log("✅ userRoutes.js cargado correctamente");

// ============================================================
// 🔹 CONFIGURACIÓN MULTER PARA ARCHIVOS EN MEMORIA
// ============================================================
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("❌ Solo se permiten archivos de imagen"), false);
};
const upload = multer({
  storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // 40MB
  fileFilter,
});

// ============================================================
// 🔹 RUTA DE PRUEBA
// ============================================================
router.get("/test", (req, res) => {
  console.log("📥 GET /api/user/test");
  res.json({
    success: true,
    message: "Ruta /api/user/test funcionando correctamente 🚀",
    timestamp: new Date(),
  });
});

// ============================================================
// 🔹 SINCRONIZAR USUARIO (VERSIÓN SUPER ROBUSTA)
// ============================================================
router.post("/sync", verifyFirebaseToken, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;

    console.log('🔄 Sincronizando usuario:', { uid, email, name });

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: 'UID de usuario no disponible'
      });
    }

    // Usar el método findOrCreate mejorado
    const user = await User.findOrCreate({
      uid: uid,
      email: email,
      name: name,
      picture: picture
    });

    console.log('✅ Usuario sincronizado exitosamente:', user.uid);

    res.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.nombre,
        photoUrl: user.profilePhoto || user.avatar
      },
      message: 'Usuario sincronizado correctamente'
    });

  } catch (error) {
    console.error('❌ Error en sync:', error);
    
    if (error.code === 11000) {
      console.log('⚠️  Error de duplicado, detalles:', error.keyValue);
      
      // Estrategia de recuperación automática
      try {
        console.log('🔄 Intentando recuperación automática...');
        const { uid, email } = req.user;
        
        // Buscar el usuario existente
        const existingUser = await User.findOne({
          $or: [
            { uid: uid },
            { email: email }
          ]
        });
        
        if (existingUser) {
          return res.json({
            success: true,
            user: {
              uid: existingUser.uid,
              email: existingUser.email,
              displayName: existingUser.displayName || existingUser.nombre,
              photoUrl: existingUser.profilePhoto || existingUser.avatar
            },
            message: 'Usuario recuperado automáticamente'
          });
        }
      } catch (recoveryError) {
        console.error('❌ Error en recuperación:', recoveryError);
      }
      
      return res.status(400).json({
        success: false,
        message: 'Error de duplicación en la base de datos',
        error: error.keyValue
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al sincronizar usuario: ' + error.message
    });
  }
});

// ============================================================
// 🔹 GALERÍA PÚBLICA (sin token)
// ============================================================
router.get("/all-photos", async (req, res) => {
  try {
    const photos = await UserPhoto.find({ isPublic: true }).sort({ uploadedAt: -1 });
    res.json({ success: true, total: photos.length, photos });
  } catch (err) {
    console.error("❌ Error cargando galería pública:", err);
    res.status(500).json({ success: false, error: "Error al cargar galería pública" });
  }
});

// ============================================================
// 🔹 GALERÍA PERSONAL (requiere autenticación)
// ============================================================
router.get("/photos", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const photos = await UserPhoto.find({ userId: uid }).sort({ uploadedAt: -1 });
    res.json({ success: true, total: photos.length, photos });
  } catch (err) {
    console.error("❌ Error obteniendo fotos de galería:", err);
    res.status(500).json({ success: false, error: "Error al obtener las fotos" });
  }
});

// ============================================================
// 🔹 FOTO DE PERFIL (GET) - CORREGIDO
// ============================================================
router.get("/profile-photo", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await User.findOne({ uid: uid });
    
    if (!user) {
      return res.json({ 
        success: true, 
        photo: null,
        message: "Usuario no encontrado" 
      });
    }
    
    res.json({ 
      success: true, 
      photo: user.profilePhoto || user.avatar || null 
    });
  } catch (err) {
    console.error("❌ Error al obtener foto de perfil:", err);
    res.status(500).json({ success: false, error: "Error al obtener foto de perfil" });
  }
});

// ============================================================
// 🔹 INFORMACIÓN DEL USUARIO
// ============================================================
router.get("/info", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const user = await User.findOne({ uid: uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }
    
    res.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.nombre,
        photoUrl: user.profilePhoto || user.avatar,
        fechaRegistro: user.fechaRegistro
      }
    });
  } catch (err) {
    console.error("❌ Error obteniendo información del usuario:", err);
    res.status(500).json({ success: false, error: "Error al obtener información" });
  }
});

// ============================================================
// 🔹 SUBIR FOTO DE PERFIL (VERSIÓN CORREGIDA)
// ============================================================
router.post("/upload-photo", verifyFirebaseToken, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: "No se recibió ningún archivo" 
      });
    }

    const uid = req.user.uid;
    const type = req.body.type || "gallery";
    const folder = type === "profile" ? "ecoturismo_perfiles" : "ecoturismo_uploads";

    console.log('📸 Subiendo foto para usuario:', uid, 'Tipo:', type);

    // ☁️ Subir a Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    console.log('✅ Foto subida a Cloudinary:', result.secure_url);

    if (type === "profile") {
      // Usar findOrCreate para manejar usuario existente o nuevo
      const user = await User.findOrCreate({
        uid: uid,
        email: req.user.email,
        name: req.user.name,
        picture: result.secure_url
      });

      // Actualizar foto de perfil
      user.profilePhoto = result.secure_url;
      user.avatar = result.secure_url;
      await user.save();

      return res.json({
        success: true,
        message: "✅ Foto de perfil actualizada correctamente",
        photoUrl: result.secure_url,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoUrl: user.profilePhoto
        }
      });
    }

    // Guardar foto en UserPhoto para galería
    const newPhoto = new UserPhoto({
      userId: uid,
      url: result.secure_url,
      publicId: result.public_id,
      type: "gallery",
      description: req.body.description || "Foto subida por el usuario",
      location: req.body.location || "No especificada",
      isPublic: true,
      uploadedAt: new Date(),
      cloudinaryData: {
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
      },
    });

    await newPhoto.save();

    res.json({
      success: true,
      message: "✅ Foto subida correctamente a la galería",
      photo: newPhoto,
    });
  } catch (err) {
    console.error("❌ Error al subir foto:", err);
    
    if (err.code === 11000) {
      return res.status(400).json({ 
        success: false,
        error: "Error de duplicación. Contacta al administrador." 
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: "Error al subir la foto: " + err.message 
    });
  }
});

// ============================================================
// 🔹 ACTUALIZAR FOTO DE PERFIL DIRECTAMENTE
// ============================================================
router.post("/update-profile-photo", verifyFirebaseToken, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: "Falta el archivo de imagen" 
      });
    }

    const uid = req.user.uid;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "ecoturismo_perfiles" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    // Usar findOrCreate para mayor robustez
    const user = await User.findOrCreate({
      uid: uid,
      email: req.user.email,
      name: req.user.name,
      picture: result.secure_url
    });

    // Actualizar foto
    user.profilePhoto = result.secure_url;
    user.avatar = result.secure_url;
    await user.save();

    res.json({
      success: true,
      message: "✅ Foto de perfil actualizada correctamente",
      profilePhoto: result.secure_url,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.profilePhoto
      }
    });
  } catch (err) {
    console.error("❌ Error al actualizar foto de perfil:", err);
    res.status(500).json({ 
      success: false,
      error: "Error al actualizar la foto de perfil" 
    });
  }
});

// ============================================================
// 🔹 ELIMINAR FOTO DE GALERÍA
// ============================================================
router.delete("/photos/:photoId", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const photoId = req.params.photoId;

    const photo = await UserPhoto.findOne({ _id: photoId, userId: uid });

    if (!photo) {
      return res.status(404).json({
        success: false,
        error: "Foto no encontrada o no tienes permisos"
      });
    }

    // Eliminar de Cloudinary
    await cloudinary.uploader.destroy(photo.publicId);

    // Eliminar de la base de datos
    await UserPhoto.findByIdAndDelete(photoId);

    res.json({
      success: true,
      message: "✅ Foto eliminada correctamente"
    });
  } catch (err) {
    console.error("❌ Error eliminando foto:", err);
    res.status(500).json({
      success: false,
      error: "Error al eliminar la foto"
    });
  }
});
// ============================================================
// 🔹 ACTUALIZAR FOTO DE GALERÍA
// ============================================================
router.put("/photos/:photoId", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const photoId = req.params.photoId;
    const { description, location } = req.body;

    console.log('🔄 Actualizando foto:', { photoId, uid, description, location });

    const photo = await UserPhoto.findOne({ _id: photoId, userId: uid });

    if (!photo) {
      return res.status(404).json({
        success: false,
        error: "Foto no encontrada o no tienes permisos"
      });
    }

    // Actualizar campos
    if (description !== undefined) photo.description = description;
    if (location !== undefined) photo.location = location;
    
    photo.updatedAt = new Date();

    await photo.save();

    console.log('✅ Foto actualizada correctamente');

    res.json({
      success: true,
      message: "✅ Foto actualizada correctamente",
      photo: photo
    });
  } catch (err) {
    console.error("❌ Error actualizando foto:", err);
    res.status(500).json({
      success: false,
      error: "Error al actualizar la foto"
    });
  }
});

// ============================================================
// 🔹 ELIMINAR FOTO DE GALERÍA (VERSIÓN MEJORADA)
// ============================================================
router.delete("/photos/:photoId", verifyFirebaseToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const photoId = req.params.photoId;

    console.log('🗑️ Eliminando foto:', { photoId, uid });

    const photo = await UserPhoto.findOne({ _id: photoId, userId: uid });

    if (!photo) {
      return res.status(404).json({
        success: false,
        error: "Foto no encontrada o no tienes permisos"
      });
    }

    // Eliminar de Cloudinary
    try {
      await cloudinary.uploader.destroy(photo.publicId);
      console.log('✅ Foto eliminada de Cloudinary');
    } catch (cloudinaryError) {
      console.error('⚠️ Error eliminando de Cloudinary:', cloudinaryError);
      // Continuar aunque falle Cloudinary para eliminar de la base de datos
    }

    // Eliminar de la base de datos
    await UserPhoto.findByIdAndDelete(photoId);

    console.log('✅ Foto eliminada de la base de datos');

    res.json({
      success: true,
      message: "✅ Foto eliminada correctamente"
    });
  } catch (err) {
    console.error("❌ Error eliminando foto:", err);
    res.status(500).json({
      success: false,
      error: "Error al eliminar la foto"
    });
  }
});
// ============================================================
// 🔹 LIMPIAR USUARIOS TEMPORALES (para administración)
// ============================================================
router.delete("/cleanup-temp-users", verifyFirebaseToken, async (req, res) => {
  try {
    const result = await User.cleanupTempUsers();
    res.json({
      success: true,
      message: `Limpieza completada. ${result?.deletedCount || 0} usuarios temporales eliminados.`
    });
  } catch (err) {
    console.error("❌ Error en limpieza:", err);
    res.status(500).json({
      success: false,
      error: "Error al limpiar usuarios temporales"
    });
  }
});

export default router;