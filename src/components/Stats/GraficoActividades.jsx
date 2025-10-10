import styles from './GraficoActividades.module.css';

export function GraficoActividades({ datos }) {
    const maxValue = Math.max(...datos.flatMap(dia => dia.actividades.map(act => act.valor)));
    
    return (
        <div className={styles.graficoContainer}>
            <div className={styles.graficoHeader}>
                <span className={styles.tituloGrafico}>Actividades para reducir estrés</span>
            </div>
            
            <div className={styles.graficoContent}>
                <div className={styles.barrasContainer}>
                    {datos.map((dia, index) => (
                        <div key={index} className={styles.diaColumna}>
                            <div className={styles.barrasGrupo}>
                                {dia.actividades.map((actividad, actIndex) => {
                                    const altura = (actividad.valor / maxValue) * 100;
                                    return (
                                        <div
                                            key={actIndex}
                                            className={styles.barra}
                                            style={{
                                                height: `${altura}%`,
                                                backgroundColor: actividad.color
                                            }}
                                            title={`${actividad.nombre}: ${actividad.valor}`}
                                        ></div>
                                    );
                                })}
                            </div>
                            <span className={styles.diaLabel}>{dia.dia}</span>
                        </div>
                    ))}
                </div>
                
                {/* Leyenda */}
                <div className={styles.leyenda}>
                    {datos[0].actividades.map((actividad, index) => (
                        <div key={index} className={styles.leyendaItem}>
                            <div 
                                className={styles.colorIndicador}
                                style={{ backgroundColor: actividad.color }}
                            ></div>
                            <span>{actividad.nombre}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}