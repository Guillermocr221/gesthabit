import styles from './MedallaCard.module.css';

export function MedallaCard({ 
    nombre, 
    descripcion, 
    porcentaje, 
    estadistica, 
    icono, 
    borderColor, 
    obtenida 
}) {
    return (
        <div className={styles.medallaContainer}>
            {/* Card de la medalla */}
            <div 
                className={styles.medallaCard}
                style={{ borderLeftColor: borderColor }}
            >
                <div className={styles.medallaInfo}>
                    <div className={styles.medallaHeader}>
                        <h4 className={styles.nombreMedalla}>{nombre}</h4>
                        <p className={styles.descripcionMedalla}>{descripcion}</p>
                        <div className={styles.estadisticaMedalla}>
                            <span className={styles.estadisticaTexto}>{estadistica}</span>
                        </div>
                    </div>
                </div>

                {/* Icono de la medalla */}
                <div className={styles.iconoContainer}>
                    <span className={styles.iconoMedalla}>{icono}</span>
                </div>
            </div>
        </div>
    );
}