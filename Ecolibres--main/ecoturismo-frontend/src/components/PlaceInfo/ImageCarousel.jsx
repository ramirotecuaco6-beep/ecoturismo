// src/components/PlaceInfo/ImageCarousel.jsx
import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext"; // ✅ Importar el contexto

const ImageCarousel = ({ imagenes, currentSlide, setCurrentSlide }) => {
  const { darkMode } = useDarkMode(); // ✅ Obtener el estado del modo oscuro

  // Validar y limpiar imágenes
  const imagenesValidas = Array.isArray(imagenes) 
    ? imagenes.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  if (imagenesValidas.length === 0) {
    return (
      <motion.div 
        className={`relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-6 transition-all duration-300 ${
          darkMode ? 'border border-gray-700' : ''
        }`}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <div className={`w-full h-full flex items-center justify-center transition-colors duration-300 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <span className={`transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No hay imágenes disponibles
          </span>
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
      className={`relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-6 transition-all duration-300 ${
        darkMode ? 'border border-gray-700' : ''
      }`}
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

      {/* Overlay para mejor contraste en modo oscuro */}
      {darkMode && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      )}

      {/* Indicadores */}
      {imagenesValidas.length > 1 && (
        <>
          {/* Botones de navegación */}
          <button
            onClick={() => setCurrentSlide((currentSlide - 1 + imagenesValidas.length) % imagenesValidas.length)}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800/80 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white/80 hover:bg-white text-gray-800'
            }`}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((currentSlide + 1) % imagenesValidas.length)}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800/80 hover:bg-gray-700 text-white border border-gray-600' 
                : 'bg-white/80 hover:bg-white text-gray-800'
            }`}
          >
            ›
          </button>

          {/* Puntos indicadores */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {imagenesValidas.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? darkMode 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white shadow-md'
                    : darkMode 
                      ? 'bg-white/40 hover:bg-white/60' 
                      : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/80 text-white border border-gray-600' 
              : 'bg-black/50 text-white'
          }`}>
            {currentSlide + 1} / {imagenesValidas.length}
          </div>

          {/* Indicador de modo oscuro en la esquina superior izquierda */}
          <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-semibold transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/80 text-green-400 border border-gray-600' 
              : 'bg-white/80 text-green-700'
          }`}>
            {darkMode ? '🌙' : '☀️'} Galería
          </div>
        </>
      )}

      {/* Efecto de brillo en los bordes para modo oscuro */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-white/5"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ImageCarousel;