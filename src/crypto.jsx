import React, { useState, useEffect } from 'react';
// <-- fetch sin terminar 
 export const Crypto = ({ coinName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <-- Faltaba esto

  useEffect(() => {
    setLoading(true);
    setError(null);

    // El fetch llama al servidor de Node que ya tienes corriendo
    fetch(`http://localhost:4000/market/${coinName}`)
      .then(res => {
        if (!res.ok) throw new Error("No se encontró la moneda");
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Error de conexión con el servidor");
        setLoading(false);
      });
  }, [coinName]); 

  if (loading) return <p>Cargando {coinName}...</p>;
  if (error) return <p style={{ color: 'red' }}>⚠️ {error}</p>;

  return (
    <div className="crypto-card">
      <h3>{data.nombre}</h3>
      <p>Precio: ${data.precio}</p>
      <span>Símbolo: {data.simbolo}</span>
    </div>
  );
};