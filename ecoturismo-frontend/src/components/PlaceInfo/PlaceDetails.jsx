import React from 'react';

const PlaceDetails = ({ lugarActual, customDestination }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-2xl font-bold text-green-700 mb-4">
        ℹ️ Acerca de {customDestination ? 'Nuevo Destino' : lugarActual.nombre}
      </h3>
      <p className="text-gray-700 mb-4 text-lg">
        {customDestination ? 'Destino personalizado seleccionado en el mapa' : lugarActual.descripcion}
      </p>
      
      {!customDestination && (
        <>
          <h4 className="text-xl font-semibold text-green-600 mb-3">
            📌 Datos interesantes:
          </h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {lugarActual.datosInteresantes.map((dato, index) => (
              <li key={index} className="text-lg">{dato}</li>
            ))}
          </ul>
        </>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700">
          <span className="font-semibold">📍 Dirección:</span> {customDestination ? 'Ubicación personalizada en el mapa' : lugarActual.direccion}
        </p>
      </div>

      {/* Instrucciones de uso */}
      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-700 mb-2">💡 Instrucciones de uso:</h4>
        <ul className="text-sm text-yellow-600 space-y-1">
          <li>• <strong>Botón inferior izquierdo:</strong> Activa/desactiva el centrado automático</li>
          <li>• <strong>Triple clic en el mapa:</strong> Establece nuevo destino (solo durante navegación)</li>
          <li>• <strong>Zoom y arrastre:</strong> Siempre disponibles cuando el centrado está desactivado</li>
        </ul>
      </div>
    </div>
  );
};

export default PlaceDetails;