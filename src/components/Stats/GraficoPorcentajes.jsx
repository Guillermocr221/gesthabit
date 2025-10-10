import styles from './GraficoPorcentajes.module.css';

export function GraficoPorcentajes({ datos }) {
    const total = datos.reduce((sum, item) => sum + item.valor, 0);
    
    // Función para crear el path del arco SVG
    const crearArcPath = (startAngle, endAngle, innerRadius, outerRadius) => {
        const start = polarToCartesian(50, 50, outerRadius, endAngle);
        const end = polarToCartesian(50, 50, outerRadius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        
        return [
            "M", 50, 50, 
            "L", start.x, start.y, 
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    };
    
    // Convertir coordenadas polares a cartesianas
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };
    
    let currentAngle = 0;
    const radius = 35;
    
    return (
        <div className={styles.graficoContainer}>
            <div className={styles.graficoHeader}>
                <span className={styles.tituloGrafico}>Minutos por mes</span>
            </div>
            
            <div className={styles.graficoContent}>
                <div className={styles.chartContainer}>
                    <svg viewBox="0 0 100 100" className={styles.pieChart}>
                        {datos.map((item, index) => {
                            const angle = (item.valor / total) * 360;
                            const path = crearArcPath(currentAngle, currentAngle + angle, 0, radius);
                            currentAngle += angle;
                            
                            return (
                                <path
                                    key={index}
                                    d={path}
                                    fill={item.color}
                                    stroke="white"
                                    strokeWidth="0.5"
                                    className={styles.segmento}
                                />
                            );
                        })}
                        
                        {/* Círculo central para hacer efecto donut (opcional) */}
                        <circle 
                            cx="50" 
                            cy="50" 
                            r="15" 
                            fill="#f0f0f0"
                            className={styles.centroCirculo}
                        />
                        
                        {/* Texto central */}
                        <text 
                            x="50" 
                            y="50" 
                            textAnchor="middle" 
                            dy="0.3em" 
                            className={styles.textoCentral}
                            fontSize="8"
                            fill="#666"
                        >
                            Total
                        </text>
                        <text 
                            x="50" 
                            y="58" 
                            textAnchor="middle" 
                            dy="0.3em" 
                            className={styles.textoCentral}
                            fontSize="6"
                            fill="#666"
                        >
                            {datos.reduce((sum, item) => sum + item.minutos, 0)} min
                        </text>
                    </svg>
                </div>
                
                {/* Leyenda */}
                <div className={styles.leyenda}>
                    {datos.map((item, index) => (
                        <div key={index} className={styles.leyendaItem}>
                            <div 
                                className={styles.colorIndicador}
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <div className={styles.itemInfo}>
                                <span className={styles.nombreActividad}>{item.nombre}</span>
                                <div className={styles.estadisticas}>
                                    <span className={styles.porcentaje}>{item.valor}%</span>
                                    <span className={styles.minutos}>{item.minutos} min</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}