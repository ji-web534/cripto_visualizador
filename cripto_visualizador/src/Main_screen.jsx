import React from 'react'
import './main_screen.css'
import { cryptos } from './crypto'
import { useParams, Link } from 'react-router-dom' 

export default function Main_screen() {
 const { id } = useParams();
const moneda = cryptos.find((c) => Number(c.id) === Number(id));
console.log("¡El archivo Main_screen se ha leído!");
if (!moneda) {
 return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error: Moneda no encontrada</h2>
        <p>Buscamos el ID: {id}</p>
        <p>IDs disponibles: {cryptos.map(c => c.id).join(", ")}</p>
      </div>
    );
  }
 console.log("ID que viene de la URL:", id);
console.log("¿Existe el array cryptos?:", cryptos);
console.log("¡El archivo Main_screen se ha leído!");
  return (
     <div className="main-screen">
      
      <div className="crypto_main_card detail_view"> {/* Añadí una clase por si quieres darle estilo extra */}
        
        <div className="coin_info">
          <img src={moneda.imagen} alt={moneda.nombre} width="60" /> {/* Un poco más grande para el detalle */}
          <div>
            <h3>{moneda.nombre} <span>{moneda.simbolo}</span></h3>
            <p>Volumen 24h: {moneda.volumen_24h}</p>
          </div>
        </div>

        <div className="crypto_chart">
          <img 
            src={moneda.grafico} 
            alt="trend" 
            style={{ 
              filter: moneda.cambio_24h > 0 
                ? 'hue-rotate(80deg) saturate(5)' 
                : 'hue-rotate(300deg) saturate(5)' 
            }} 
          />
        </div>

        <div className="coin_price">
          <p className="price_val">${moneda.precio.toLocaleString()}</p>
          <p className={moneda.cambio_24h > 0 ? 'up' : 'down'}>
            {moneda.cambio_24h}% en las últimas 24hs
          </p>
        </div>

        {/* Aquí podrías agregar más info que no va en la lista, como la descripción */}
        <div className="coin_description">
          <p>{moneda.descripcion}</p>
        </div>

      </div>
    </div>
  )
  
}
