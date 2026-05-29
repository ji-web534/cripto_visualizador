import React, { useState } from 'react'; 
import './side-bar.css';
import { Link } from 'react-router-dom';
import { useCrypto } from './CryptoProvider.jsx';

export default function Side_bar() {
  const { crypto, loading, error } = useCrypto();
  

  const [busqueda, setBusqueda] = useState("");

  const definirColor24h = (variacion) => {
    if (variacion > 0) return '#22c55e'; 
    if (variacion < 0) return '#ef4444'; 
    return '#94a3b8';                    
  };

 
  const cryptosFiltradas = crypto ? crypto.filter(item => {
    const nombre = item.name?.toLowerCase() || "";
    const simbolo = item.symbol?.toLowerCase() || "";
    const terminoBuscado = busqueda.toLowerCase();
    return nombre.includes(terminoBuscado) || simbolo.includes(terminoBuscado);
  }) : [];


  if (loading) return <div className="side-bar">Cargando criptos...</div>;
  if (error) return <div className="side-bar">Error: {error}</div>;

 
  return (
    <div className="side-bar">
    
      <div className="buscador">
        <input
          type="text"
          className="buscador-input"
          placeholder="Buscar moneda..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} 
        />
      </div>

    
      <div className="crypto-lista">
        {cryptosFiltradas.map(item => (
          <Link 
            key={item.id} 
            to={`/crypto/${item.id}`} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="crypto-card">
              <img src={item.image} alt={item.name} width="30" height="30" />
              <div className="crypto-card-info">
                <h3>{item.name} <span className="simbolo">({item.symbol.toUpperCase()})</span></h3>
                <p className="precio">Precio: ${item.current_price?.toLocaleString()}</p>
                <p 
                  className="porcentaje" 
                  style={{ color: definirColor24h(item.cambio_24h || item.price_change_percentage_24h) }}
                >
                  {(item.cambio_24h || item.price_change_percentage_24h) >= 0 ? '▲' : '▼'} {Math.abs(item.cambio_24h || item.price_change_percentage_24h || 0).toFixed(2)}%
                </p>
              </div>
            </div>
          </Link>
        ))}

        {cryptosFiltradas.length === 0 && (
          <p className="no-resultados">No se encontraron criptomonedas.</p>
        )}
      </div>
    </div>
  );
}
