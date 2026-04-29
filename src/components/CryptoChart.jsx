import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CryptoChart({ data }) {
    const chartContainerRef = useRef();

    useEffect(() => {
        if (!chartContainerRef.current || !data || data.length === 0) return;

        chartContainerRef.current.innerHTML = '';
        let chart;

        try {
            // 1. Crear el gráfico (Sintaxis v5)
            chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { color: '#131722' },
                    textColor: '#d1d4dc',
                },
            });

            // 2. En la v5, si addAreaSeries falla, 'Area' como string es el fallback oficial
            // Intentamos el método directo y si no, el genérico.
            const areaSeries = chart.addAreaSeries ? 
                chart.addAreaSeries({
                    lineColor: '#2962ff',
                    topColor: '#2962ff',
                    bottomColor: 'rgba(41, 98, 255, 0.28)',
                }) : 
                chart.addSeries('Area', {
                    lineColor: '#2962ff',
                });

            // 3. Procesar datos (La v5 es MUY estricta con el orden)
            const processedData = [...data]
                .map(item => ({
                    time: Number(item.time),
                    value: Number(item.value)
                }))
                .sort((a, b) => a.time - b.time);

            // Eliminar duplicados de tiempo (Causa el Assertion failed en v5)
            const finalData = [...data]
                .map(item => {
                    // Si el timestamp tiene 13 dígitos (milisegundos), lo bajamos a 10 (segundos)
                    let timestamp = Number(item.time);
                    if (timestamp > 10000000000) { 
                        timestamp = Math.floor(timestamp / 1000); 
                    }
                    
                    return {
                        time: timestamp,
                        value: parseFloat(item.value)
                    };
                })
                .filter(item => !isNaN(item.time) && !isNaN(item.value))
                .sort((a, b) => a.time - b.time)
                .filter((item, index, self) => 
                    index === 0 || item.time > self[index - 1].time
                );

            console.log("🚀 Datos finales que recibirá la v5:", finalData);

            if (finalData.length > 0) {
                areaSeries.setData(finalData);
                chart.timeScale().fitContent();
            }

    return (
        <div 
            ref={chartContainerRef} 
            style={{ width: '100%', height: '300px', backgroundColor: '#131722' }} 
        />
    );
