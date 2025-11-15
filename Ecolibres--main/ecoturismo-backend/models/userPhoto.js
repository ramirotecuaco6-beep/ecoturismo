// models/UserPhoto.js
import mongoose from "mongoose";

const UserPhotoSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true,
    index: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  publicId: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['profile', 'gallery', 'personal'], 
    default: 'gallery' 
  },
  description: { 
    type: String, 
    default: '' 
  },
  location: { 
    type: String, 
    default: 'Libres, Puebla' 
  },
  isPublic: { 
    type: Boolean, 
    default: false  // Por defecto las fotos son privadas
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  },
  cloudinaryData: {
    format: String,
    bytes: Number,
    width: Number,
    height: Number
  }
}, {
  timestamps: true
});

export default mongoose.model("UserPhoto", UserPhotoSchema);