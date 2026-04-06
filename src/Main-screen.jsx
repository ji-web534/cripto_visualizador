import React from 'react'
import './main-screen.css'
import {useCrypto} from './CryptoProvider.jsx'
import { useParams } from 'react-router-dom' 
import { Details_bar } from './Details-bar';
import { Coin_value } from './Coin-value.JSX';

export default function Main_screen() {
    const { crypto, loading, error } = useCrypto(); 
 const { id } = useParams();
const moneda =  crypto.find((c) => Number(c.id) === Number(id));

if (!moneda) {
 return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error: Moneda no encontrada</h2>
        <p>Buscamos el ID: {id}</p>
        <p>IDs disponibles: {crypto.map(c => c.id).join(", ")}</p>
      </div>
    );
  }
    const chart = createChart(container, {
    layout: { background: { color: '#000' }, textColor: '#ccc' },
    grid: { vertLines: { visible: false } }, // Quitar líneas verticales
    crosshair: { mode: 0 }, // Modo imán para seguir el precio
});
const fetchHistory = async (coinId) => {
  const response = await fetch(`http://localhost:4000/market/history/${coinId}`);
  const data = await response.json();
  return (
     <div className="main-screen">

      <div> 
        
        <Details_bar  />

        <div >
         
        </div>

      <Coin_value/>

      </div>
    </div>
  )
  
} }
