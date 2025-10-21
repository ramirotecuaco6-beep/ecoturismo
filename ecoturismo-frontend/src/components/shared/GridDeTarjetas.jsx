// src/components/shared/GridDeTarjetas.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GridDeTarjetas({ titulo, subtitulo, items, tipo }) {
  const navigate = useNavigate();

  const handleVerMas = (item) => {
    if (tipo === "actividades") {
      navigate(`/actividad/${item._id}`);
    } else {
      navigate(`/lugar/${item._id}`);
    }
  };

  const handleComoLlegar = (item) => {
    // Para actividades, usar el nombre del lugar relacionado
    if (tipo === "actividades" && item.lugar) {
      console.log("Navegando a ruta con nombre de lugar:", item.lugar);
      navigate(`/ruta/${encodeURIComponent(item.lugar)}`);
    } else if (tipo === "lugares" && item.nombre) {
      // Para lugares, usar el nombre directamente
      console.log("Navegando a ruta con nombre de lugar:", item.nombre);
      navigate(`/ruta/${encodeURIComponent(item.nombre)}`);
    } else {
      console.error("No se puede determinar el destino para la navegación:", item);
      // Fallback: mostrar error
      alert("No se puede calcular la ruta: información del destino no disponible");
    }
  };

  return (
    <section
      className={`py-24 px-6 ${
        tipo === "actividades"
          ? "bg-gradient-to-b from-white to-green-50"
          : "bg-gradient-to-b from-primary-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div
            className={`inline-block ${
              tipo === "actividades"
                ? "bg-green-600"
                : "bg-gradient-to-r from-accent-500 to-accent-600"
            } text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg`}
          >
            {tipo === "actividades" ? "🏞️ Experiencias Únicas" : "🗺️ Descubre"}
          </div>

          <h2 className="text-5xl font-black text-gray-900 mb-6">
            {titulo}{" "}
            {tipo === "lugares" && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-secondary-600">
                Emblemáticos
              </span>
            )}
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitulo}
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {items.map((item, idx) => {
            const id = item._id || item.id || idx;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Imagen */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.imagen_url || "/placeholder.jpg"}
                    alt={item.nombre || "Imagen"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.rating && tipo === "lugares" && (
                    <span className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      ⭐ {item.rating}
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-accent-600 transition-colors duration-300">
                      {item.nombre || item.titulo}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-4">
                      {item.descripcion || "Descripción no disponible"}
                    </p>

                    {tipo === "actividades" && item.lugar && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          📍 Ubicación: <span className="font-semibold text-gray-700">{item.lugar}</span>
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.caracteristicas?.map((feature, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col md:flex-row gap-3 mt-auto">
                    {tipo === "actividades" ? (
                      <>
                        <button
                          onClick={() => handleVerMas(item)}
                          className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          Ver Más
                        </button>
                        <button
                          onClick={() => handleComoLlegar(item)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Cómo Llegar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleVerMas(item)}
                          className="flex-1 bg-accent-600 hover:bg-accent-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Ver Detalles
                        </button>
                        <button
                          onClick={() => handleComoLlegar(item)}
                          className="flex-1 p-3 rounded-xl border border-gray-300 hover:border-accent-600 hover:text-accent-600 transition-all duration-300"
                        >
                          📍 Cómo Llegar
                        </button>
                        {item.reservable && (
                          <button
                            onClick={() => navigate(`/reserva/${id}`)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Reservar
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}