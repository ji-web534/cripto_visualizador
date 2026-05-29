import React, { useState } from 'react';

export function Search_cryptos({ listaDeCriptos, alSeleccionarMoneda }) {
   
    const [busqueda, setBusqueda] = useState("");

   
    const criptosFiltradas = listaDeCriptos.filter(moneda => {
        
        return moneda.name.toLowerCase().includes(busqueda.toLowerCase());
    });

    return (
        <div className="buscador-contenedor">
            <input 
                type="text" 
                placeholder="Buscar moneda..." 
                value={busqueda}
               
                onChange={(e) => setBusqueda(e.target.value)} 
            />

            <ul className="lista-resultados">
                {criptosFiltradas.map(moneda => (
                    <li key={moneda.id} onClick={() => alSeleccionarMoneda(moneda)}>
                        {moneda.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}