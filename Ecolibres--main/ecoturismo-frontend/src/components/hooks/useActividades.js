// src/components/hooks/useActividades.js
import { useState, useEffect } from "react";

export function useActividades() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/actividades")
      .then((res) => res.json())
      .then((data) => {
        setActividades(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { actividades, loading, error };
}
