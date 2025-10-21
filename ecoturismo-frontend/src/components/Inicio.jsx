import React from 'react';

export default function Inicio() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
      {/* ... */}
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-black text-white mb-6">
          Descubre Libres
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Donde cada sendero cuenta una historia y cada experiencia se convierte en un recuerdo eterno.
        </p>
        
        {/* ... */}
      </div>
    </section>
  );
}