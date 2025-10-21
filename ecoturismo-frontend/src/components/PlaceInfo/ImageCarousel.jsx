// src/components/PlaceInfo/ImageCarousel.jsx
import React from "react";
import { motion } from "framer-motion";

const ImageCarousel = ({ imagenes, currentSlide, setCurrentSlide }) => {
  // Validar y limpiar imágenes
  const imagenesValidas = Array.isArray(imagenes) 
    ? imagenes.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  if (imagenesValidas.length === 0) {
    return (
      <motion.div 
        className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-6" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No hay imágenes disponibles</span>
        </div>
      </motion.div>
    );
  }

  // Función para verificar si una URL es válida
  const getSafeImageUrl = (url) => {
    if (!url || typeof url !== 'string') {
      return '/placeholder.jpg';
    }
    
    // Reemplazar URLs problemáticas
    if (url.includes('placeimg.com') && url.includes('water')) {
      return '/placeholder.jpg';
    }
    
    return url;
  };

  return (
    <motion.div 
      className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Imagen actual */}
      <img
        src={getSafeImageUrl(imagenesValidas[currentSlide])}
        alt={`Vista ${currentSlide + 1} del lugar`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = '/placeholder.jpg';
        }}
      />

      {/* Indicadores */}
      {imagenesValidas.length > 1 && (
        <>
          {/* Botones de navegación */}
          <button
            onClick={() => setCurrentSlide((currentSlide - 1 + imagenesValidas.length) % imagenesValidas.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % imagenesValidas.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            ›
          </button>

          {/* Puntos indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {imagenesValidas.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentSlide + 1} / {imagenesValidas.length}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ImageCarousel;