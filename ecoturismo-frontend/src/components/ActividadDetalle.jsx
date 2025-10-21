// src/components/ActividadDetalle.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { apiService } from "../services/api";

const ActividadDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        setLoading(true);
        const actividadData = await apiService.getActividadPorId(id);
        setActividad(actividadData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [id]);

  const handleComoLlegar = () => {
    if (actividad?.lugar) {
      navigate(`/ruta/${encodeURIComponent(actividad.lugar)}`);
    }
  };

  if (loading) {
    return (
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 animate-pulse">Cargando actividad...</p>
        </div>
      </section>
    );
  }

  if (error || !actividad) {
    return (
      <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl text-red-600 font-bold mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error || "Actividad no encontrada"}</p>
          <button onClick={() => navigate(-1)} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            ← Volver
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition"
        >
          ← Volver a Actividades
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Imagen */}
          <div className="relative h-80 w-full">
            <img 
              src={actividad.imagen_url || "/placeholder.jpg"} 
              alt={actividad.nombre}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Contenido */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-green-700 mb-4">{actividad.nombre}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{actividad.descripcion}</p>
            
            {/* Información adicional */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {actividad.lugar && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">📍 Ubicación</h3>
                  <p className="text-green-700">{actividad.lugar}</p>
                </div>
              )}
              
              {actividad.duracion && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">⏱️ Duración</h3>
                  <p className="text-blue-700">{actividad.duracion}</p>
                </div>
              )}
              
              {actividad.dificultad && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">⚡ Dificultad</h3>
                  <p className="text-orange-700">{actividad.dificultad}</p>
                </div>
              )}
              
              {actividad.precio && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">💰 Precio</h3>
                  <p className="text-purple-700">{actividad.precio}</p>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              {actividad.lugar && (
                <button
                  onClick={handleComoLlegar}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  🗺️ Cómo Llegar
                </button>
              )}
              
              <button
                onClick={() => navigate('/actividades')}
                className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver Más Actividades
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActividadDetalle;