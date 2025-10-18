import { useState, useRef } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [gpsAvailable, setGpsAvailable] = useState(false);
  const [error, setError] = useState(null);
  const [speed, setSpeed] = useState(0);
  const watchIdRef = useRef(null);

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalización no soportada"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude
          ];
          resolve(userLocation);
        },
        (error) => {
          let errorMessage = "Error obteniendo ubicación";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permiso de ubicación denegado";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Información de ubicación no disponible";
              break;
            case error.TIMEOUT:
              errorMessage = "Tiempo de espera agotado";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        }
      );
    });
  };

  const startWatchingPosition = (onPositionUpdate) => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const currentPos = [pos.coords.latitude, pos.coords.longitude];
        const currentSpeed = pos.coords.speed || 0;
        
        setPosition(currentPos);
        setSpeed(currentSpeed);
        
        if (onPositionUpdate) {
          onPositionUpdate(currentPos, currentSpeed);
        }
      },
      (err) => {
        setError(`Error GPS: ${err.message}`);
      },
      { 
        enableHighAccuracy: true, 
        maximumAge: 3000, 
        timeout: 10000 
      }
    );
  };

  const stopWatchingPosition = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return {
    position,
    gpsAvailable,
    error,
    speed,
    setGpsAvailable,
    setError,
    getUserLocation,
    startWatchingPosition,
    stopWatchingPosition
  };
};