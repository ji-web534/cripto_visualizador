import React, { useState, useEffect } from 'react';

//  El backend está en fase de desarrollo inicial.
const CryptoCard = ({ coinName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`http://localhost:4000/market/${coinName}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, [coinName]); 

  if (loading) return <p>Cargando {coinName}...</p>;

  return (
    <div className="crypto-card">
      <h3>{data.nombre}</h3>
      <p>Precio: ${data.precio}</p>
      <span>Símbolo: {data.simbolo}</span>
    </div>
  );
};