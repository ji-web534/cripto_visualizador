import React from 'react'
import './side-bar.css'
import { Link } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { useCrypto } from './CryptoProvider.jsx';
export default function Side_bar() {
  const { crypto, loading, error, } = useCrypto();
  //creamos la funcion que se encarga de el camio de color


  const definirColor24h = (variacion) => {
    if (variacion > 0) return '#22c55e'; // Un verde moderno
    if (variacion < 0) return '#ef4444'; // Un rojo moderno
    return '#94a3b8';                    // Gris si no hubo cambio
  };



  // Manejamos el estado de carga y error)
  if (loading) return <div className="side-bar">Cargando criptos...</div>;
  if (error) return <div className="side-bar">Error: {error}</div>;

  return 
<div className="side-bar">
            {/* Contenedor del Buscador */}
            <div className="buscador">
                <input
                    type="text"
                    className="buscador-input"
                    placeholder="Buscar moneda..."
                    value={busqueda}
                    // Cada vez que el usuario escribe, se actualiza la const 'busqueda'
                    onChange={(e) => setBusqueda(e.target.value)} 
                />
            </div>

            {/* Contenedor de la lista: mapeamos el array ya filtrado */}
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
                                    style={{ color: definirColor24h(item.cambio_24h) }}
                                >
                                    {item.cambio_24h >= 0 ? '▲' : '▼'} {Math.abs(item.cambio_24h || 0).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Mensaje de respaldo por si no encuentra ninguna moneda */}
                {cryptosFiltradas.length === 0 && (
                    <p className="no-resultados">No se encontraron criptomonedas.</p>
                )}
            </div>
        </div>
    
}
