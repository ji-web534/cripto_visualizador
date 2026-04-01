import React from 'react'
import './side-bar.css'
import { useCrypto } from './CryptoProvider.jsx';
import { Link } from 'react-router-dom'
export default function Side_bar() {
  const { crypto, loading, error } = useCrypto(); 
  //creamos la funcion que se encarga de el camio de color


  const definirColor24h = (variacion) => {
  if (variacion > 0) return '#22c55e'; // Un verde moderno
  if (variacion < 0) return '#ef4444'; // Un rojo moderno
  return '#94a3b8';                    // Gris si no hubo cambio
};
  

  //  Conectamos el dato con nuestra función
  const colorDinamico = definirColor24h(cambio);;
  // 2. Manejamos el estado de carga y error)
  if (loading) return <div className="side-bar">Cargando criptos...</div>;
  if (error) return <div className="side-bar">Error: {error}</div>;
  return (



    <div className="side-bar"  >
      <div class="buscador">
        <input
          type="text"
          class="buscador-input"
          placeholder="Buscar moneda..."
        />
      </div>
      {crypto.map(crypto => (
        <Link to={`/crypto/${crypto.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <div key={crypto.id} className="crypto-card">
            <img src={crypto.image} alt={crypto.name} width="30" />
            <div className=''>

              <h3>{crypto.name} ({crypto.symbol})</h3>
              <p>Precio: ${crypto.current_price?.toLocaleString()}</p>


              <p style={{  }}>
                {crypto.cambio_24h >= 0 ? '▲' : '▼'} {Math.abs(crypto.cambio_24h)}%
              </p>

            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
