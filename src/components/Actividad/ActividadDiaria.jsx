import styles from './ActividadDiaria.module.css';

export function ActividadDiaria({ 
    hora, 
    periodo, 
    tipo, 
    cantidadHecha, 
    meta, 
    icono, 
    borderColor, 
    completada 
}) {
    return (
        <div className={styles.actividadContainer}>
            {/* Hora y período */}
            <div className={styles.tiempoContainer}>
                <div className={styles.hora}>{hora}</div>
                <div className={styles.periodo}>{periodo}</div>
            </div>

            {/* Card de la actividad */}
            <div 
                className={styles.actividadCard}
                style={{ borderLeftColor: borderColor }}
            >
                <div className={styles.actividadInfo}>
                    <div className={styles.actividadHeader}>
                        <h4 className={styles.tipoActividad}>{tipo}</h4>
                        <div className={styles.cantidadMeta}>
                            <span className={styles.cantidad}>{cantidadHecha}</span>
                            <span className={styles.metaBadge}>{meta}</span>
                        </div>
                    </div>
                </div>

                {/* Icono de la actividad */}
                <div className={styles.iconoContainer}>
                    <img src={icono} alt={tipo} className={styles.iconoActividad} />
                </div>
            </div>
        </div>
    );
}