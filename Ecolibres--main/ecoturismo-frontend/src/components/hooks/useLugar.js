import { useState, useEffect } from "react";

export function useLugar(nombreLugar) {
  const [data, setData] = useState(null); // { lugar, actividades }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLugar() {
      try {
        const res = await fetch(`http://localhost:5000/api/lugares/${encodeURIComponent(nombreLugar)}`);
        if (!res.ok) throw new Error("Error al obtener el lugar");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (nombreLugar) fetchLugar();
  }, [nombreLugar]);

  return { data, loading, error };
}
