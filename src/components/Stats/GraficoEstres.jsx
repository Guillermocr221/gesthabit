import styles from './GraficoEstres.module.css';

export function GraficoEstres({ datos }) {
    const { mesActual, mesPasado } = datos;
    
    // Configuración del gráfico
    const maxValue = 10;
    const width = 100;
    const height = 60;
    const padding = 10;
    
    // Función para crear puntos SVG
    const crearPuntos = (data, color) => {
        return data.map((valor, index) => {
            const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
            const y = height - padding - ((valor / maxValue) * (height - padding * 2));
            return { x, y, valor, index };
        });
    };
    
    // Función para crear path de línea
    const crearPath = (puntos) => {
        if (puntos.length === 0) return '';
        
        let path = `M ${puntos[0].x} ${puntos[0].y}`;
        for (let i = 1; i < puntos.length; i++) {
            path += ` L ${puntos[i].x} ${puntos[i].y}`;
        }
        return path;
    };
    
    const puntosActual = crearPuntos(mesActual, '#45B7D1');
    const puntosPasado = crearPuntos(mesPasado, '#FF6B6B');
    
    return (
        <div className={styles.graficoContainer}>
            <div className={styles.graficoHeader}>
                <h4 className={styles.tituloGrafico}>Niveles de estrés</h4>
            </div>
            
            <div className={styles.graficoContent}>
                <svg 
                    viewBox={`0 0 ${width} ${height}`} 
                    className={styles.svg}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Líneas de cuadrícula horizontales */}
                    {[...Array(6)].map((_, i) => {
                        const y = padding + (i * (height - padding * 2) / 5);
                        return (
                            <line
                                key={i}
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                stroke="#333"
                                strokeWidth="0.2"
                                opacity="0.3"
                            />
                        );
                    })}
                    
                    {/* Números del eje Y */}
                    {[...Array(6)].map((_, i) => {
                        const y = padding + (i * (height - padding * 2) / 5);
                        const valor = maxValue - (i * 2);
                        return (
                            <text
                                key={i}
                                x={padding - 2}
                                y={y + 1}
                                fontSize="3"
                                fill="white"
                                textAnchor="end"
                            >
                                {valor}
                            </text>
                        );
                    })}
                    
                    {/* Números del eje X */}
                    {[1, 3, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((dia, index) => {
                        if (index % 2 === 0) { // Mostrar solo números pares para evitar saturación
                            const x = (index / 29) * (width - padding * 2) + padding;
                            return (
                                <text
                                    key={dia}
                                    x={x}
                                    y={height - 2}
                                    fontSize="2.5"
                                    fill="white"
                                    textAnchor="middle"
                                >
                                    {dia}
                                </text>
                            );
                        }
                        return null;
                    })}
                    
                    {/* Línea del mes pasado */}
                    <path
                        d={crearPath(puntosPasado)}
                        fill="none"
                        stroke="#FF6B6B"
                        strokeWidth="0.8"
                        className={styles.lineaPasado}
                    />
                    
                    {/* Línea del mes actual */}
                    <path
                        d={crearPath(puntosActual)}
                        fill="none"
                        stroke="#45B7D1"
                        strokeWidth="0.8"
                        className={styles.lineaActual}
                    />
                    
                    {/* Puntos del mes pasado */}
                    {puntosPasado.map((punto, index) => (
                        <circle
                            key={`pasado-${index}`}
                            cx={punto.x}
                            cy={punto.y}
                            r="0.8"
                            fill="#FF6B6B"
                        />
                    ))}
                    
                    {/* Puntos del mes actual */}
                    {puntosActual.map((punto, index) => (
                        <circle
                            key={`actual-${index}`}
                            cx={punto.x}
                            cy={punto.y}
                            r="0.8"
                            fill="#45B7D1"
                        />
                    ))}
                    
                    {/* Punto destacado (día actual) */}
                    <circle
                        cx={puntosActual[8]?.x || 0}
                        cy={puntosActual[8]?.y || 0}
                        r="1.5"
                        fill="white"
                        stroke="#45B7D1"
                        strokeWidth="1"
                    />
                </svg>
                
                {/* Leyenda */}
                <div className={styles.leyenda}>
                    <div className={styles.leyendaItem}>
                        <div className={styles.lineaEjemplo} style={{ backgroundColor: '#45B7D1' }}></div>
                        <span>Estrés Este Mes</span>
                    </div>
                    <div className={styles.leyendaItem}>
                        <div className={styles.lineaEjemplo} style={{ backgroundColor: '#FF6B6B' }}></div>
                        <span>Estrés Mes Pasado</span>
                    </div>
                </div>
            </div>
        </div>
    );
}