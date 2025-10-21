import React from 'react';

const RouteInstructions = ({ 
  currentInstruction, 
  estimatedDistance, 
  estimatedTime, 
  distance, 
  userPath,
  autoCentering,
  accuracy  // 🔥 NUEVO: recibir precisión
}) => {
  const getAccuracyColor = (acc) => {
    if (!acc) return 'text-gray-500';
    if (acc < 10) return 'text-green-600';
    if (acc < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyText = (acc) => {
    if (!acc) return 'Desconocida';
    if (acc < 10) return 'Excelente';
    if (acc < 50) return 'Buena';
    if (acc < 100) return 'Regular';
    return 'Baja';
  };

  return (
    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="p-3 bg-white rounded-lg border border-green-200 mb-3">
        <p className="text-green-700 font-semibold flex items-center gap-2 text-lg">
          <span className="text-xl">📢</span>
          {currentInstruction}
        </p>
        
        {/* 🔥 NUEVO: Mostrar información de precisión */}
        {accuracy && (
          <div className="mt-2 p-2 bg-gray-50 rounded-lg">
            <p className={`text-sm font-medium ${getAccuracyColor(accuracy)}`}>
              🎯 Precisión GPS: {accuracy.toFixed(0)} metros ({getAccuracyText(accuracy)})
            </p>
            {accuracy > 50 && (
              <p className="text-xs text-orange-600 mt-1">
                💡 Sugerencia: Muévete a un área abierta para mejor precisión
              </p>
            )}
          </div>
        )}
        
        {!autoCentering && (
          <p className="text-xs text-blue-600 mt-2">
            ✨ Modo manual activado - mueve el mapa libremente
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
        <div>
          <span className="font-semibold text-blue-700">📏 Total:</span>
          <p className="text-blue-600">{estimatedDistance || '--'}</p>
        </div>
        <div>
          <span className="font-semibold text-blue-700">⏱️ Tiempo:</span>
          <p className="text-blue-600">{estimatedTime || '--'}</p>
        </div>
        <div>
          <span className="font-semibold text-blue-700">🚶 Recorrido:</span>
          <p className="text-blue-600">{distance.toFixed(2)} km</p>
        </div>
        <div>
          <span className="font-semibold text-blue-700">📍 Puntos GPS:</span>
          <p className="text-blue-600">{userPath.length}</p>
        </div>
        <div>
          <span className="font-semibold text-blue-700">🎯 Precisión:</span>
          <p className={`${getAccuracyColor(accuracy)}`}>
            {accuracy ? `${accuracy.toFixed(0)}m` : '--'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteInstructions;