import styles from './GraficoEstres.module.css';

export function GraficoEstres({ datos }) {
    const { mesActual, fechas } = datos;
    
    // Configuración del gráfico
    const maxValue = 100; // Cambiar a 100 para porcentajes
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
    
    const puntosActual = crearPuntos(mesActual, '#4CAF50');
    
    return (
        <div className={styles.graficoContainer}>
            <div className={styles.graficoHeader}>
                <h4 className={styles.tituloGrafico}>Porcentaje de metas cumplidas</h4>
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
                        const valor = maxValue - (i * 20); // De 100 a 0 de 20 en 20
                        return (
                            <text
                                key={i}
                                x={padding - 2}
                                y={y + 1}
                                fontSize="3"
                                fill="white"
                                textAnchor="end"
                            >
                                {valor}%
                            </text>
                        );
                    })}
                    
                    {/* Área de relleno bajo la línea */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.1"/>
                        </linearGradient>
                    </defs>
                    
                    {/* Área rellena */}
                    <path
                        d={`${crearPath(puntosActual)} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
                        fill="url(#areaGradient)"
                    />
                    
                    {/* Línea principal */}
                    <path
                        d={crearPath(puntosActual)}
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="1.2"
                        className={styles.lineaActual}
                    />
                    
                    {/* Puntos en la línea */}
                    {puntosActual.map((punto, index) => (
                        <circle
                            key={`actual-${index}`}
                            cx={punto.x}
                            cy={punto.y}
                            r="0.8"
                            fill="#4CAF50"
                        />
                    ))}
                    
                    {/* Punto destacado (día actual) */}
                    <circle
                        cx={puntosActual[puntosActual.length - 1]?.x || 0}
                        cy={puntosActual[puntosActual.length - 1]?.y || 0}
                        r="1.5"
                        fill="white"
                        stroke="#4CAF50"
                        strokeWidth="1"
                    />
                </svg>
                
                {/* Información adicional */}
                <div className={styles.infoAdicional}>
                    <div className={styles.estadistica}>
                        <span className={styles.label}>Promedio:</span>
                        <span className={styles.valor}>
                            {Math.round(mesActual.reduce((sum, val) => sum + val, 0) / mesActual.length)}%
                        </span>
                    </div>
                    <div className={styles.estadistica}>
                        <span className={styles.label}>Mejor día:</span>
                        <span className={styles.valor}>{Math.max(...mesActual)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}