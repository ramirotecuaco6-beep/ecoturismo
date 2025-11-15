import mongoose from "mongoose";
const { Schema } = mongoose;

// 🦶 Esquema de pasos diarios
const StepSchema = new Schema(
  {
    date: { type: Date, required: true },
    steps: { type: Number, default: 0 },
  },
  { _id: false }
);

// 🏆 Esquema de logros
const AchievementSchema = new Schema(
  {
    id: String,
    nombre: String,
    fecha_desbloqueo: { type: Date, default: Date.now },
  },
  { _id: false }
);

// 📍 Lugares visitados
const VisitedPlaceSchema = new Schema(
  {
    placeId: { type: Schema.Types.ObjectId, ref: "Place" },
    visitedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// 👤 Usuario principal - VERSIÓN SUPER ROBUSTA
const UserSchema = new Schema({
  // 🔥 CAMPO PRINCIPAL - HACER required: false TEMPORALMENTE
  uid: { 
    type: String, 
    required: false,  // ✅ CAMBIADO A false TEMPORALMENTE
    unique: true,
    sparse: true 
  },
  
  // 📧 Email como opcional
  email: { 
    type: String, 
    required: false, 
    unique: true,
    sparse: true 
  },
  
  nombre: { type: String },
  displayName: { type: String },
  
  // 🖼️ Foto de perfil
  profilePhoto: { type: String, default: "" },
  avatar: { type: String },
  
  fechaRegistro: { type: Date, default: Date.now },
  logros: [AchievementSchema],
  visitedPlaces: [VisitedPlaceSchema],
  stepsByDay: [StepSchema],
}, {
  timestamps: true
});

// Índices para consultas rápidas
UserSchema.index({ uid: 1 }, { unique: true, sparse: true });
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

// ✅ Método MEJORADO para encontrar o crear usuario
UserSchema.statics.findOrCreate = async function(firebaseUser) {
  try {
    if (!firebaseUser.uid) {
      throw new Error('UID es requerido para findOrCreate');
    }

    console.log('🔍 Buscando usuario con UID:', firebaseUser.uid);
    
    // Buscar por UID primero
    let user = await this.findOne({ uid: firebaseUser.uid });
    
    if (!user && firebaseUser.email) {
      console.log('🔍 Buscando usuario con email:', firebaseUser.email);
      // Si no existe, buscar por email
      user = await this.findOne({ email: firebaseUser.email });
    }
    
    if (user) {
      console.log('✅ Usuario encontrado, actualizando datos');
      // Actualizar datos si el usuario existe
      user.email = firebaseUser.email || user.email;
      user.displayName = firebaseUser.name || user.displayName;
      user.nombre = firebaseUser.name || user.nombre;
      user.profilePhoto = firebaseUser.picture || user.profilePhoto;
      
      // Asegurar que tenga UID
      if (!user.uid && firebaseUser.uid) {
        user.uid = firebaseUser.uid;
      }
    } else {
      console.log('🆕 Creando nuevo usuario con UID:', firebaseUser.uid);
      // Crear nuevo usuario
      user = new this({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.name,
        nombre: firebaseUser.name,
        profilePhoto: firebaseUser.picture || ""
      });
    }
    
    await user.save();
    console.log('💾 Usuario guardado exitosamente');
    return user;
    
  } catch (error) {
    console.error('❌ Error en findOrCreate:', error);
    throw error;
  }
};

// ✅ Middleware para validar antes de guardar
UserSchema.pre('save', function(next) {
  // Si no tiene UID, asignar uno temporal para evitar errores de índice único
  if (!this.uid) {
    this.uid = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log('⚠️  Usuario sin UID, asignado temporal:', this.uid);
  }
  next();
});

// ✅ Método estático para limpieza de usuarios temporales
UserSchema.statics.cleanupTempUsers = async function() {
  try {
    const result = await this.deleteMany({ 
      uid: { $regex: /^temp_/ } 
    });
    console.log(`🧹 ${result.deletedCount} usuarios temporales eliminados`);
    return result;
  } catch (error) {
    console.error('❌ Error en cleanupTempUsers:', error);
  }
};

export default mongoose.model("User", UserSchema);