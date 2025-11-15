import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import MapCenterUpdater from './MapControls/MapCenterUpdater';
import TripleClickHandler from './MapControls/TripleClickHandler';
import CenterControl from './MapControls/CenterControl';
import { userIcon, destinationIcon } from '../utils/mapUtils';
import { useDarkMode } from '../../context/DarkModeContext'; // ✅ Ruta corregida

const NavigationMap = ({
  position,
  lugarActual,
  customDestination,
  routeGeometry,
  userPath,
  speed,
  autoCentering,
  onTripleClick,
  onCenterToggle
}) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden relative transition-all duration-300 ${
      darkMode 
        ? 'border-2 border-gray-600 shadow-lg' 
        : 'border-2 border-green-300 shadow-md'
    }`}>
      <MapContainer
        center={position || lugarActual.coordenadas}
        zoom={13}
        style={{ 
          height: '100%', 
          width: '100%',
          minHeight: '384px'
        }}
        className="interactive-map z-0"
      >
        {/* TileLayer adaptativo para modo oscuro/claro */}
        <TileLayer
          url={darkMode 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={darkMode 
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        />

        {/* Componentes de control del mapa */}
        <MapCenterUpdater position={position} autoCentering={autoCentering} />
        <TripleClickHandler onTripleClick={onTripleClick} />
        <CenterControl onCenterClick={onCenterToggle} autoCentering={autoCentering} />

        {/* Marcador de posición actual */}
        {position && (
          <Marker position={position} icon={userIcon}>
            <Popup>
              <div className={`text-center p-2 ${darkMode ? 'dark-popup' : ''}`}>
                <strong className={`${darkMode ? 'text-gray-800' : 'text-gray-900'}`}>
                  📍 Tu ubicación actual
                </strong>
                <br/>
                <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                  Vel: {(speed * 3.6).toFixed(0)} km/h
                </span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcador del destino */}
        <Marker
          position={customDestination || lugarActual.coordenadas}
          icon={destinationIcon}
        >
          <Popup>
            <div className={`text-center p-2 ${darkMode ? 'dark-popup' : ''}`}>
              <strong className={`${darkMode ? 'text-gray-800' : 'text-gray-900'}`}>
                🎯 {customDestination ? 'Nuevo Destino' : lugarActual.nombre}
              </strong>
              <br/>
              <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                {customDestination ? 'Destino personalizado' : (lugarActual.direccion || 'Sin dirección específica')}
              </span>
            </div>
          </Popup>
        </Marker>

        {/* Ruta trazada */}
        {routeGeometry && (
          <Polyline
            positions={routeGeometry}
            color={darkMode ? "#60A5FA" : "#3B82F6"}
            weight={6}
            opacity={0.8}
          />
        )}

        {/* Ruta recorrida */}
        {userPath.length > 1 && (
          <Polyline
            positions={userPath}
            color={darkMode ? "#34D399" : "#10B981"}
            weight={4}
            opacity={0.9}
          />
        )}
      </MapContainer>

      {/* Indicador de modo del mapa */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold z-10 transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800 text-green-400 border border-gray-600' 
          : 'bg-white text-green-700 border border-green-200'
      }`}>
        {darkMode ? '🌙 Mapa Oscuro' : '☀️ Mapa Claro'}
      </div>

      {/* Indicador de centrado automático */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold z-10 transition-all duration-300 ${
        autoCentering 
          ? darkMode 
            ? 'bg-green-800 text-green-300 border border-green-600' 
            : 'bg-green-100 text-green-800 border border-green-300'
          : darkMode 
            ? 'bg-gray-700 text-gray-400 border border-gray-600' 
            : 'bg-gray-100 text-gray-600 border border-gray-300'
      }`}>
        {autoCentering ? '📍 Auto-centrado' : '🔄 Centrado manual'}
      </div>
    </div>
  );
};

export default NavigationMap;