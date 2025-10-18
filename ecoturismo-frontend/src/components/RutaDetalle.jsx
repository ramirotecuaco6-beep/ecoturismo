import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Importaciones CORREGIDAS
import { lugaresInfo, defaultLugar } from "./utils/constants";
import { setupLeafletIcons } from "./utils/mapUtils";
import { useGeolocation } from "./hooks/useGeolocation";
import { useRouteCalculation } from "./hooks/useRouteCalculation";
import { useNavigation } from "./hooks/useNavigation";
import 'leaflet/dist/leaflet.css';

// Componentes modulares
import ImageCarousel from "./PlaceInfo/ImageCarousel";
import PlaceDetails from "./PlaceInfo/PlaceDetails";
import NavigationControls from "./navigation/NavigationControls";
import NavigationMap from "./navigation/NavigationMap";
import RouteInstructions from "./navigation/RouteInfo/RouteInstructions";
import RouteStats from "./navigation/RouteInfo/RouteStats";

// Configurar iconos de Leaflet
setupLeafletIcons();

const RutaDetalle = () => {
  const { nombreLugar } = useParams();
  const navigate = useNavigate();
  
  // Estados del componente
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState("Haz clic en 'Iniciar Navegación' para comenzar");
  const [autoCentering, setAutoCentering] = useState(true);
  const [customDestination, setCustomDestination] = useState(null);

  // Obtener información del lugar
  const lugarActual = lugaresInfo[nombreLugar] || {
    ...defaultLugar,
    nombre: decodeURIComponent(nombreLugar)
  };

  // Custom Hooks
  const {
    position,
    gpsAvailable,
    error,
    speed,
    setGpsAvailable,
    setError,
    getUserLocation,
    startWatchingPosition,
    stopWatchingPosition
  } = useGeolocation();

  const {
    routeGeometry,
    estimatedTime,
    estimatedDistance,
    instructions,
    nextTurn,
    loadingRoute,
    routeCalculated,
    calculateRouteWithMapbox,
    resetRoute,
    setInstructions
  } = useRouteCalculation();

  const {
    isNavigating,
    distance,
    userPath,
    achievements,
    startNavigation: startNav,
    stopNavigation: stopNav,
    handlePositionUpdate
  } = useNavigation(routeCalculated, lugarActual, customDestination, nextTurn, setCurrentInstruction);

  // 🆕 MANEJAR TRIPLE CLIC PARA NUEVO DESTINO
  const handleTripleClick = async (latlng) => {
    if (!isNavigating) return;
    
    const newDestination = [latlng.lat, latlng.lng];
    setCustomDestination(newDestination);
    setCurrentInstruction("🔄 Calculando nueva ruta...");
    
    // Recalcular ruta hacia el nuevo destino
    await calculateRouteWithMapbox(position, newDestination, lugarActual, newDestination, autoCentering);
    
    setCurrentInstruction("✅ Nueva ruta calculada. Continúa tu viaje.");
  };

  // 🆕 TOGGLE CENTRADO AUTOMÁTICO
  const toggleAutoCentering = () => {
    setAutoCentering(prev => !prev);
    setCurrentInstruction(
      autoCentering 
        ? "📍 Centrado automático DESACTIVADO - Puedes mover el mapa libremente" 
        : "📍 Centrado automático ACTIVADO - El mapa te seguirá"
    );
  };

  // INICIAR NAVEGACIÓN
  const startNavigation = async () => {
    try {
      startNav();
      setAutoCentering(true);
      setCustomDestination(null);
      setCurrentInstruction("📍 Obteniendo tu ubicación GPS...");
      
      const userLocation = await getUserLocation();
      setGpsAvailable(true);
      
      await calculateRouteWithMapbox(userLocation, lugarActual.coordenadas, lugarActual, null, true);
      
      // Iniciar seguimiento GPS
      startWatchingPosition(handlePositionUpdate);
      
    } catch (error) {
      console.error("Error en navegación:", error);
      setCurrentInstruction("❌ " + error.message);
      setGpsAvailable(false);
    }
  };

  const stopNavigation = () => {
    stopNav();
    resetRoute();
    stopWatchingPosition();
    setCurrentInstruction("Haz clic en 'Iniciar Navegación' para comenzar");
    setAutoCentering(true);
    setCustomDestination(null);
  };

  // Auto-avance del carrusel
  useEffect(() => {
    if (lugarActual.imagenes.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % lugarActual.imagenes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [lugarActual.imagenes.length]);

  // Actualizar instrucciones cuando cambia el estado de centrado
  useEffect(() => {
    if (instructions.length > 0 && routeCalculated) {
      setCurrentInstruction(instructions[0]);
    }
  }, [instructions, routeCalculated]);

  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        
        <button
          onClick={() => navigate(-1)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition"
        >
          ← Volver a Actividades
        </button>

        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          🌿 Ruta hacia: {customDestination ? 'Nuevo Destino' : lugarActual.nombre}
        </h2>

        {/* Carrusel de imágenes */}
        <ImageCarousel 
          imagenes={lugarActual.imagenes}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />

        {/* Información del lugar */}
        <PlaceDetails 
          lugarActual={lugarActual}
          customDestination={customDestination}
        />

        {/* Navegación y Mapa */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-green-700">
              🗺️ Navegación en Tiempo Real
            </h3>
            <NavigationControls 
              isNavigating={isNavigating}
              loadingRoute={loadingRoute}
              onStartNavigation={startNavigation}
              onStopNavigation={stopNavigation}
            />
          </div>

          {/* Información de la ruta */}
          <RouteInstructions 
            currentInstruction={currentInstruction}
            estimatedDistance={estimatedDistance}
            estimatedTime={estimatedTime}
            distance={distance}
            userPath={userPath}
            autoCentering={autoCentering}
          />

          {/* Mapa interactivo */}
          <NavigationMap
            position={position}
            lugarActual={lugarActual}
            customDestination={customDestination}
            routeGeometry={routeGeometry}
            userPath={userPath}
            speed={speed}
            autoCentering={autoCentering}
            onTripleClick={handleTripleClick}
            onCenterToggle={toggleAutoCentering}
          />
        </div>

        {/* Estadísticas y logros */}
        <RouteStats 
          distance={distance}
          userPath={userPath}
          speed={speed}
          isNavigating={isNavigating}
          achievements={achievements}
        />
      </div>
    </section>
  );
};

export default RutaDetalle;