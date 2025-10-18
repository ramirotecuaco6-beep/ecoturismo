export default function Inicio() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
      {/* Background con efecto parallax */}
      <div className="absolute inset-0 bg-nature-pattern bg-cover bg-center bg-fixed"></div>
      
      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-accent-900/80"></div>
      
      {/* Elementos decorativos animados */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-300/20 rounded-full mix-blend-soft-light filter blur-3xl animate-float-slow animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-300/10 rounded-full mix-blend-soft-light filter blur-2xl animate-pulse-glow"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge destacado */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span>
          <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">✨ Experiencias Únicas en Libres</span>
        </div>
        
        {/* Título principal */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 leading-tight">
            <span className="block">Descubre</span>
            <span className="text-gradient bg-gradient-to-r from-white via-accent-200 to-secondary-300">Libres</span>
          </h1>
        </div>
        
        {/* Descripción */}
        <div className="mb-12 max-w-4xl mx-auto animate-fade-in animation-delay-4000">
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Donde cada sendero cuenta una historia, cada montaña guarda un secreto y cada experiencia 
            se convierte en un <span className="font-semibold text-accent-300">recuerdo eterno</span>. 
            Bienvenido al ecoturismo de verdad.
          </p>
        </div>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
          <button className="btn-primary text-lg px-12 py-4 flex items-center gap-3 group">
            <span>Explorar Experiencias</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button className="btn-glass text-lg px-12 py-4 flex items-center gap-3 group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Ver Nuestra Historia</span>
          </button>
        </div>
        
        {/* Stats destacados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in">
          {[
            { number: '50+', label: 'Tours Únicos', icon: '🗺️' },
            { number: '2K+', label: 'Aventureros', icon: '👥' },
            { number: '4.9', label: 'Rating', icon: '⭐' },
            { number: '98%', label: 'Satisfacción', icon: '😊' }
          ].map((stat, index) => (
            <div key={index} className="text-center card-glass p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white mb-1">{stat.number}</div>
              <div className="text-white/70 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-white/60 text-sm font-medium">Descubre más</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}