import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Actividades() {
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const navigate = useNavigate();

  const actividades = [
    {
      title: "🌄 Espeleología",
      description:
        "Adéntrate en las misteriosas cuevas y grutas de Libres. Experiencia guiada con equipo profesional.",
      image:
        "https://images.unsplash.com/photo-1545337267-5c4bcd042b9d?auto=format&fit=crop&w=800&q=80",
      features: ["Guía certificado", "Equipo incluido", "Fotos profesionales"],
      price: "$450",
      lugar: "Grutas de Zapotitlán",
    },
    {
      title: "🥾 Senderismo",
      description:
        "Recorridos por senderos naturales con vistas panorámicas espectaculares. Diferentes niveles de dificultad.",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      features: ["Rutas variadas", "Guía local", "Snacks incluidos"],
      price: "$300",
      lugar: "Bosque de Libres",
    },
    {
      title: "🦜 Avistamiento de Aves",
      description:
        "Observación de la diversa avifauna local con expertos ornitólogos. Ideal para fotógrafos.",
      image:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
      features: ["Binoculares", "Guía especializado", "Checklist especies"],
      price: "$350",
      lugar: "Reserva El Encanto",
    },
  ];

  const iniciarRuta = (actividad) => {
    setActividadSeleccionada(actividad);
    
    // Navegar directamente a RutaDetalle
    navigate(`/ruta/${encodeURIComponent(actividad.lugar)}`);
  };

  return (
    <section
      id="actividades"
      className="pt-36 pb-24 px-6 bg-gradient-to-b from-white to-green-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            🏞️ Experiencias Únicas
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Actividades Ecológicas
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Descubre tus rutas, mide tu esfuerzo y disfruta de la naturaleza con
            nuestro rastreador ecológico.
          </p>
        </div>

        {/* Grid de Actividades */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-12">
          {actividades.map((actividad, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative overflow-hidden">
                <img
                  src={actividad.image}
                  alt={actividad.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 text-green-700 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    {actividad.price}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                  {actividad.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {actividad.description}
                </p>

                {/* Lista de características */}
                <ul className="space-y-2 mb-6">
                  {actividad.features.map((feature, featureIdx) => (
                    <li
                      key={featureIdx}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <svg
                        className="w-4 h-4 text-green-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Botones */}
                <div className="flex gap-3">
                  {/* Reservar */}
                  <button className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-xl font-semibold transition-all duration-300 w-1/2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2h6v2m-7 4h8a2 2 0 002-2v-6H5v6a2 2 0 002 2zM15 3H9v4h6V3z"
                      />
                    </svg>
                    Reservar
                  </button>

                  {/* Iniciar Ruta */}
                  <button
                    onClick={() => iniciarRuta(actividad)}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 w-1/2 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.24v7.52a1 1 0 001.234.97l6.518-1.504a1 1 0 00.766-.97v-3.088a1 1 0 00-.766-.97z"
                      />
                    </svg>
                    Iniciar Ruta
                  </button>

                  {/* Me gusta */}
                  <button className="p-3 rounded-xl border border-gray-300 hover:border-green-600 hover:text-green-600 transition-all duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}