// src/components/DetalleLugar.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { apiService } from "../services/api";

const DetalleLugar = () => {
  const { id } = useParams(); // ahora usamos id siempre
  const navigate = useNavigate();

  const [lugar, setLugar] = useState(null);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔹 Fetch lugar o actividad
  useEffect(() => {
    const fetchLugar = async () => {
      try {
        setLoading(true);
        let data;

        // Primero intentamos obtener como lugar
        try {
          data = await apiService.getLugarPorId(id);
        } catch {
          // Si falla, intentamos obtener actividad
          const actData = await apiService.getActividadPorId(id);
          if (!actData || !actData.lugarId) throw new Error("Lugar de la actividad no encontrado");
          data = await apiService.getLugarPorId(actData.lugarId);
        }

        setLugar(data.lugar);
        setActividades(data.actividades || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al obtener el lugar");
        setLugar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLugar();
  }, [id]);

  // 🔹 Carrusel multimedia
  useEffect(() => {
    if (!lugar) return;
    const totalSlides = (lugar.imagenes?.length || 0) + (lugar.videos?.length || 0);
    if (totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [lugar]);

  if (loading) return <p className="text-center mt-10">Cargando lugar...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!lugar) return null;

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          ← Volver
        </button>

        {/* Carrusel */}
        <motion.div
          className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {lugar.imagenes?.length + lugar.videos?.length > 0 ? (
            <>
              {currentSlide < (lugar.imagenes?.length || 0) ? (
                <img
                  src={lugar.imagenes[currentSlide]}
                  alt={`Slide ${currentSlide}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={lugar.videos[currentSlide - (lugar.imagenes?.length || 0)]}
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No hay imágenes ni videos disponibles</span>
            </div>
          )}
        </motion.div>

        {/* Info lugar */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-green-700">{lugar.nombre}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{lugar.descripcion}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold shadow-sm">
              🌿 {lugar.caracteristicas?.join(", ") || "Sin características"}
            </span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold shadow-sm">
              💰 {lugar.precio || "Gratis"}
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold shadow-sm">
              ⭐ {lugar.rating || "Sin calificación"}
            </span>
          </div>

          {/* Actividades asociadas */}
          {actividades.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-green-700">Actividades</h2>
              <ul className="list-disc list-inside">
                {actividades.map(act => (
                  <li key={act._id}>{act.nombre || act.titulo}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mapa */}
          {lugar.coordenadas && (
            <div className="mt-6 h-64 w-full rounded-xl overflow-hidden shadow-lg">
              <MapContainer
                center={[lugar.coordenadas.lat, lugar.coordenadas.lng]}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[lugar.coordenadas.lat, lugar.coordenadas.lng]}>
                  <Popup>{lugar.nombre}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DetalleLugar;
