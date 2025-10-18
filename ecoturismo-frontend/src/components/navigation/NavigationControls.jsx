import React from 'react';

const NavigationControls = ({ 
  isNavigating, 
  loadingRoute, 
  onStartNavigation, 
  onStopNavigation 
}) => {
  return (
    <div className="flex gap-2">
      {!isNavigating ? (
        <button
          onClick={onStartNavigation}
          disabled={loadingRoute}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
        >
          {loadingRoute ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Calculando...
            </>
          ) : (
            <>
              <span>🚗</span>
              Iniciar Navegación
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onStopNavigation}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
        >
          <span>⏹️</span>
          Detener Navegación
        </button>
      )}
    </div>
  );
};

export default NavigationControls;