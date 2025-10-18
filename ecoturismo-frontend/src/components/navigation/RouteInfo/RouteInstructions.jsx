import React from 'react';

const RouteInstructions = ({ 
  currentInstruction, 
  estimatedDistance, 
  estimatedTime, 
  distance, 
  userPath,
  autoCentering 
}) => {
  return (
    <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="p-3 bg-white rounded-lg border border-green-200 mb-3">
        <p className="text-green-700 font-semibold flex items-center gap-2 text-lg">
          <span className="text-xl">📢</span>
          {currentInstruction}
        </p>
        {!autoCentering && (
          <p className="text-xs text-blue-600 mt-1">
            ✨ Modo manual activado - mueve el mapa libremente
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-4 text-sm">
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
      </div>
    </div>
  );
};

export default RouteInstructions;