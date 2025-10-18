import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import MapCenterUpdater from './MapControls/MapCenterUpdater';
import TripleClickHandler from './MapControls/TripleClickHandler';
import CenterControl from './MapControls/CenterControl';
import { userIcon, destinationIcon } from '../utils/mapUtils';

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
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-green-300 relative">
      <MapContainer
        center={position || lugarActual.coordenadas}
        zoom={13}
        style={{ 
          height: '100%', 
          width: '100%',
          minHeight: '384px' // Añadido para asegurar altura mínima
        }}
        className="interactive-map z-0" // Añadido z-0 para capa correcta
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Componentes de control del mapa */}
        <MapCenterUpdater position={position} autoCentering={autoCentering} />
        <TripleClickHandler onTripleClick={onTripleClick} />
        <CenterControl onCenterClick={onCenterToggle} autoCentering={autoCentering} />

        {/* Marcador de posición actual */}
        {position && (
          <Marker position={position} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>📍 Tu ubicación actual</strong><br/>
                <span className="text-xs">
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
            <div className="text-center">
              <strong>🎯 {customDestination ? 'Nuevo Destino' : lugarActual.nombre}</strong><br/>
              <span className="text-xs">
                {customDestination ? 'Destino personalizado' : lugarActual.direccion}
              </span>
            </div>
          </Popup>
        </Marker>

        {/* Ruta trazada */}
        {routeGeometry && (
          <Polyline
            positions={routeGeometry}
            color="#3B82F6"
            weight={6}
            opacity={0.7}
          />
        )}

        {/* Ruta recorrida */}
        {userPath.length > 1 && (
          <Polyline
            positions={userPath}
            color="#10B981"
            weight={4}
            opacity={0.9}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default NavigationMap;