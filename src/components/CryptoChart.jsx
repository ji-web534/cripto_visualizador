import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef(null);

    useEffect(() => {
        // 1. Si no hay contenedor o el ancho es 0, no hacemos NADA.
        if (!chartContainerRef.current || chartContainerRef.current.clientWidth === 0) return;

        // 2. Limpieza absoluta: si ya existía un gráfico, lo destruimos antes de empezar
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
        }
        chartContainerRef.current.innerHTML = '';

        try {
            // 3. Crear el gráfico con dimensiones fijas calculadas al momento
            const container = chartContainerRef.current;
            const chart = createChart(container, {
                width: container.clientWidth,
                height: 300,
                layout: { background: { color: '#131722' }, textColor: '#d1d4dc' },
            });
            chartRef.current = chart;

            // 4. Crear la serie (aquí es donde fallaba)
            // Usamos un try/catch interno solo para esta línea para ver qué pasa
            let areaSeries;
            try {
                areaSeries = chart.addAreaSeries({
                    lineColor: '#2962ff',
                    topColor: '#2962ff',
                    bottomColor: 'rgba(41, 98, 255, 0.28)',
                });
            } catch (e) {
                console.error("Fallo específico en addAreaSeries, intentando addSeries genérico");
                areaSeries = chart.addSeries('Area', { lineColor: '#2962ff' });
            }

            // 5. Carga de datos con limpieza de duplicados (por el error de las fechas iguales)
            if (data && data.length > 0) {
                const seen = new Set();
                const cleanData = data
                    .map(item => ({
                        time: item.time,
                        value: parseFloat(item.value)
                    }))
                    .filter(item => {
                        if (seen.has(item.time)) return false;
                        seen.add(item.time);
                        return true;
                    })
                    .sort((a, b) => new Date(a.time) - new Date(b.time));

                areaSeries.setData(cleanData);
                chart.timeScale().fitContent();
            }

        } catch (error) {
            console.error("❌ Error crítico en el motor gráfico:", error);
        }

        // 6. Limpieza al desmontar el componente
        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [data]); // Solo se ejecuta cuando cambian los datos

    // Usamos un minWidth para asegurar que el div siempre tenga espacio
    return (
        <div 
            ref={chartContainerRef} 
            style={{ 
                width: '100%', 
                minWidth: '300px', 
                height: '300px', 
                backgroundColor: '#131722' 
            }} 
        />
    );
}