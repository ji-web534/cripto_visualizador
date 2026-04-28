import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (!chartContainerRef.current || !data || data.length === 0) return;

        chartContainerRef.current.innerHTML = '';

        try {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { color: '#131722' },
                    textColor: '#d1d4dc',
                },
                grid: {
                    vertLines: { color: '#2f333e' },
                    horzLines: { color: '#2f333e' },
                },
            });

            // --- SOLUCIÓN DEFINITIVA AL TYPEERROR ---
            // Usamos addSeries con un string 'Area'. 
            // Si addAreaSeries no aparece, este método genérico lo encuentra.
            const areaSeries = chart.addSeries('Area', {
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineWidth: 2,
            });

            // Aseguramos que los datos estén ordenados por tiempo
            const sortedData = [...data].sort((a, b) => a.time - b.time);
            
            areaSeries.setData(sortedData);
            chart.timeScale().fitContent();

            return () => {
                chart.remove();
            };
        } catch (error) {
            console.error("❌ Error final en el gráfico:", error);
            // Si esto falla, imprimimos el objeto chart para ver qué tiene dentro
            console.log("Contenido del objeto chart:", chart);
        }
    }, [data]);

    return (
        <div 
            ref={chartContainerRef} 
            className="crypto-chart-container" 
            style={{ width: '100%', minHeight: '300px' }}
        />
    );
}