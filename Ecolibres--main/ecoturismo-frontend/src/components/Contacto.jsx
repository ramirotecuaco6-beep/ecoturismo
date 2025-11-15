export default function Contacto() {
  return (
    <section id="contacto" className="py-24 px-6 bg-gradient-to-br from-gray-900 to-primary-900 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Información de contacto */}
          <div className="text-white animate-slide-up">
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              📞 Contáctanos
            </div>
            <h2 className="text-5xl font-black text-white mb-6">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-secondary-400">aventurarte</span>?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Estamos aquí para ayudarte a planificar la experiencia perfecta en Libres. 
              Respondeemos todas tus preguntas en menos de 24 horas.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: "📧", text: "hola@ecolibres.com" },
                { icon: "📱", text: "+52 123 456 7890" },
                { icon: "📍", text: "Libres, Puebla, México" },
                { icon: "🕒", text: "Lun - Dom: 6:00 AM - 8:00 PM" }
              ].map((contact, idx) => (
                <div key={idx} className="flex items-center space-x-4 text-white/90">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <span className="text-xl">{contact.icon}</span>
                  </div>
                  <span className="text-lg">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Formulario */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 animate-fade-in">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">
                    Nombre completo
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">
                    Correo electrónico
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">
                  Asunto
                </label>
                <input 
                  type="text" 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-semibold mb-2">
                  Mensaje
                </label>
                <textarea 
                  rows="5"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos sobre tu aventura ideal..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full btn-accent text-lg py-4 rounded-2xl flex items-center justify-center gap-3 group"
              >
                <span>Enviar Mensaje</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}