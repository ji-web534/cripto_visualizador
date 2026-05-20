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
            <div className="info-principal">
                <h1>{moneda.name}</h1>
                <p className="precio-texto">
                    Precio: <span>USD {parseFloat(moneda.current_price).toLocaleString()}</span>
                </p>
            </div>

            <div className="porcentaje-caja" style={{ color: colorEstilo }}>
                <span className="flecha">{esPositivo ? '▲' : '▼'}</span>
                <span className="numero">{Math.abs(porcentajeCambio).toFixed(2)}%</span>
                
            </div>
        </div>
    );
}

