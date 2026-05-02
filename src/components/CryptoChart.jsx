import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!chartContainerRef.current || !data) return;

        // Si el ancho es 0, el DOM aún no terminó de calcular el layout
        if (chartContainerRef.current.clientWidth === 0) {
            const timeoutId = setTimeout(() => setIsReady(prev => !prev), 100);
            return () => clearTimeout(timeoutId);
        }

        try {
            // Limpieza manual total antes de crear
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
            chartContainerRef.current.innerHTML = '';

            // 1. Crear el gráfico
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
            chartRef.current = chart;

            // 2. SOLUCIÓN AL SYNTAX ERROR:
            // Usamos el nombre de la serie como string. Esto no requiere 'SeriesType'.
            // Es la forma más compatible con Vite y versiones v4/v5.
            const areaSeries = chart.addSeries('Area', {
                lineColor: '#2962ff',
                topColor: '#2962ff',
                bottomColor: 'rgba(41, 98, 255, 0.28)',
                lineWidth: 2,
            });

            // 3. Procesamiento de datos (Lógica para tu dashboard)
            const seenTimes = new Set();
            const cleanData = [...data]
                .map(item => ({
                    // Aseguramos segundos para evitar 'Assertion failed'
                    time: Number(item.time) > 10000000000 ? Math.floor(Number(item.time) / 1000) : Math.floor(Number(item.time)),
                    value: parseFloat(item.value)
                }))
                .filter(item => {
                    if (isNaN(item.time) || isNaN(item.value) || seenTimes.has(item.time)) return false;
                    seenTimes.add(item.time);
                    return true;
                })
                .sort((a, b) => a.time - b.time);

            if (cleanData.length > 0) {
                areaSeries.setData(cleanData);
                chart.timeScale().fitContent();
            }

        } catch (error) {
            console.error("❌ Error definitivo en el gráfico:", error);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data, isReady]);

    return (
        <div 
            ref={chartContainerRef} 
            style={{ 
                width: '100%', 
                height: '300px', 
                backgroundColor: '#131722',
                borderRadius: '8px',
                overflow: 'hidden'
            }} 
        />
    );
}