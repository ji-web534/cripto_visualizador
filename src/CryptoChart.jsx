import React, { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

export default function CryptoChart({ data }) {
 const chartContainerRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0 || !chartContainerRef.current) return;

        chartContainerRef.current.innerHTML = '';

        // 2. CREAMOS EL GRÁFICO (El objeto 'chart')
        const chart = createChart(chartContainerRef.current, {
            layout: { background: { color: '#131722' }, textColor: '#d1d4dc' },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });
console.log("Objeto chart creado:", chart);
        // 3. AHORA SÍ: Usamos 'chart' (el objeto), NO 'chartContainerRef'
        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962FF',
            topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
            lineWidth: 2,
        });
     
        areaSeries.setData(data);
        chart.timeScale().fitContent();

        // 4. Limpieza: Importante para que no se duplique el gráfico
        return () => {
            chart.remove();
        };
    }, [data]);

    return (
        <div 
            ref={chartContainerRef} 
            style={{ width: '100%', height: '300px' }} 
        />
    );
}