import React from 'react';

const RouteStats = ({ distance, userPath, speed, isNavigating, achievements }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-green-700 mb-4">
        🏆 Logros de la Ruta
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-semibold text-green-600 mb-3">
            📊 Estadísticas
          </h4>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">📏 Distancia recorrida:</span> {distance.toFixed(2)} km
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">📍 Puntos GPS registrados:</span> {userPath.length}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">🚗 Velocidad actual:</span> {(speed * 3.6).toFixed(0)} km/h
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">🎯 Estado navegación:</span> {isNavigating ? 'Activa' : 'Inactiva'}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-green-600 mb-3">
            🏅 Logros Desbloqueados
          </h4>
          <div className="space-y-2">
            {achievements.length > 0 ? (
              achievements.map((logro, index) => (
                <div key={index} className="flex items-center gap-2 text-green-700">
                  <span>✅</span>
                  <span>{logro}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Comienza a caminar para desbloquear logros</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteStats;