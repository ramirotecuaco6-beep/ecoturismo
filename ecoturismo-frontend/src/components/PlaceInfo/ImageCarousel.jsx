import React from 'react';

const ImageCarousel = ({ imagenes, currentSlide, setCurrentSlide }) => {
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imagenes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-80">
        {imagenes.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Vista ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
        >
          ‹
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
        >
          ›
        </button>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {imagenes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;