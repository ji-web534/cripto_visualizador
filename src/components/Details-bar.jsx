import { useParams } from 'react-router-dom';
import "./details-bar.css"
export function Details_bar({ moneda }) { 
    // Si moneda no llega (por si acaso), evitamos que explote
    if (!moneda) return null; 

 
    const porcentajeCambio = moneda.price_change_percentage_24h || 0; 
    
   
    const esPositivo = porcentajeCambio >= 0;
    const colorEstilo = esPositivo ? '#4caf50' : '#ff5252'; 

    return (
  
    <div className="Details-bar">
        {/* LADO IZQUIERDO: Nombre de la moneda */}
        <h1>{moneda.name}</h1>
        
        
        <div className="Details-bar-precios">
            <p>Precio: USD {parseFloat(moneda.current_price || moneda.precio).toLocaleString()}</p>
            <p style={{ 
                color: (moneda.cambio_24h || moneda.price_change_percentage_24h) >= 0 ? '#4caf50' : '#ff5252',
                fontSize: '14px',
                fontWeight: 'bold'
            }}>
                {(moneda.cambio_24h || moneda.price_change_percentage_24h) >= 0 ? '▲' : '▼'} 
                {Math.abs(moneda.cambio_24h || moneda.price_change_percentage_24h || 0).toFixed(2)}%
            </p>
        </div>
    </div>
);
}

