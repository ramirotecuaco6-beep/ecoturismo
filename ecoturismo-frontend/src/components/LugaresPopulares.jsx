export default function LugaresPopulares() {
  const lugares = [
    {
      name: "🏔️ Grutas de Xonotla",
      description: "Sistema de cuevas milenarias con formaciones calcáreas únicas. Experiencia subterránea inolvidable.",
      image: "https://images.unsplash.com/photo-1545337267-5c4bcd042b9d?auto=format&fit=crop&w=500&q=80",
      rating: "4.9",
      distance: "15 km",
      features: ["Cuevas naturales", "Guías expertos", "Fotografía"]
    },
    {
      name: "🌅 Cerro del Mirador",
      description: "Vista panorámica espectacular de todo el valle de Libres. Ideal para amaneceres y atardeceres.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80",
      rating: "4.8",
      distance: "8 km", 
      features: ["Vistas 360°", "Senderos", "Camping"]
    },
    {
      name: "💧 Río Apulco",
      description: "Aguas cristalinas rodeadas de vegetación exuberante. Perfecto para deportes acuáticos y relax.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=500&q=80",
      rating: "4.7",
      distance: "25 km",
      features: ["Natación", "Kayak", "Picnic"]
    }
  ];

  return (
    <section id="lugares" className="py-24 px-6 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            🗺️ Descubre
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Lugares <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-600">Emblemáticos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Los destinos más increíbles que no te puedes perder en tu visita a Libres
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {lugares.map((lugar, idx) => (
            <div key={idx} className="group card-hover">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={lugar.image}
                    alt={lugar.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                      ⭐ {lugar.rating}
                    </span>
                    <span className="bg-primary-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      📍 {lugar.distance}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {lugar.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {lugar.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lugar.features.map((feature, featureIdx) => (
                      <span key={featureIdx} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="btn-primary flex-1 text-center justify-center">
                      Ver Detalles
                    </button>
                    <button className="btn-secondary px-4">
                      📍
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}