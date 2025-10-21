// src/components/PlaceInfo/PlaceDetails.jsx
import React from "react";

const PlaceDetails = ({ lugarActual, customDestination }) => {
  // Validación robusta del objeto lugarActual
  if (!lugarActual || typeof lugarActual !== 'object') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-700">
          ⚠️ Información del lugar no disponible temporalmente
        </p>
      </div>
    );
  }

  // Función segura para obtener valores
  const getSafeValue = (value, defaultValue = "No disponible") => {
    if (value === null || value === undefined || value === "") {
      return defaultValue;
    }
    return value;
  };

  // Validar coordenadas
  const coordenadasValidas = Array.isArray(lugarActual.coordenadas) && 
                            lugarActual.coordenadas.length === 2 &&
                            !isNaN(lugarActual.coordenadas[0]) && 
                            !isNaN(lugarActual.coordenadas[1]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-green-700 mb-4">
        📋 Información del Destino
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📍 Nombre:</h4>
          <p className="text-gray-600 text-lg font-medium">
            {getSafeValue(lugarActual.nombre)}
          </p>
        </div>
        
        {/* Descripción */}
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-800 mb-2">📝 Descripción:</h4>
          <p className="text-gray-600 leading-relaxed">
            {getSafeValue(lugarActual.descripcion)}
          </p>
        </div>
        
        {/* Coordenadas */}
        {coordenadasValidas && (
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-800 mb-2">🌐 Coordenadas:</h4>
            <p className="text-gray-600 font-mono text-sm">
              Lat: {lugarActual.coordenadas[0].toFixed(6)}, 
              Lng: {lugarActual.coordenadas[1].toFixed(6)}
            </p>
          </div>
        )}

        {/* Información adicional si está disponible */}
        {(lugarActual.caracteristicas || lugarActual.precio || lugarActual.rating) && (
          <div className="md:col-span-2 border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">📊 Información Adicional</h4>
            <div className="flex flex-wrap gap-3">
              {lugarActual.caracteristicas && Array.isArray(lugarActual.caracteristicas) && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  🏷️ {lugarActual.caracteristicas.join(", ")}
                </span>
              )}
              {lugarActual.precio && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  💰 {lugarActual.precio}
                </span>
              )}
              {lugarActual.rating && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  ⭐ {lugarActual.rating}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Destino personalizado */}
      {customDestination && Array.isArray(customDestination) && customDestination.length === 2 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-700 font-semibold">
            🎯 Destino personalizado establecido
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Coordenadas: {customDestination[0].toFixed(6)}, {customDestination[1].toFixed(6)}
          </p>
        </div>
      )}

      {/* Advertencia si no hay coordenadas */}
      {!coordenadasValidas && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 font-semibold">
            ⚠️ Coordenadas no disponibles
          </p>
          <p className="text-red-600 text-sm mt-1">
            La navegación GPS no estará disponible para este destino.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;