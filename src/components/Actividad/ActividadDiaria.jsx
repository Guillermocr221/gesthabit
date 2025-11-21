import { useState } from 'react';
import styles from './ActividadDiaria.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';

export function ActividadDiaria({ actividad, onCompletar, isEditable = true }) {
    const [loading, setLoading] = useState(false);

    const handleToggleCompletada = async () => {
        if (!isEditable || loading) return;
        
        setLoading(true);
        await onCompletar(actividad.id, !actividad.completada);
        setLoading(false);
    };

    const formatHora = (hora) => {
        if (!hora) return '';
        return hora.substring(0, 5); // HH:MM
    };

    const getPrioridadColor = (prioridad) => {
        switch (prioridad) {
            case 'alta': return '#ff4757';
            case 'media': return '#ffa502';
            case 'baja': return '#2ed573';
            default: return '#747d8c';
        }
    };

    return (
        <div className={`${styles.actividadCard} ${actividad.completada ? styles.completada : ''}`}>
            <div className={styles.contenidoActividad}>
                {/* Checkbox o indicador de completada */}
                <div 
                    className={`${styles.checkbox} ${!isEditable ? styles.disabled : ''}`}
                    onClick={handleToggleCompletada}
                >
                    {loading ? (
                        <div className={styles.spinner}></div>
                    ) : actividad.completada ? (
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.completadaIcon} />
                    ) : (
                        <div className={styles.checkboxEmpty}></div>
                    )}
                </div>

                {/* Información de la actividad */}
                <div className={styles.infoActividad}>
                    <h4 className={styles.tituloActividad}>{actividad.titulo}</h4>
                    {actividad.descripcion && (
                        <p className={styles.descripcionActividad}>{actividad.descripcion}</p>
                    )}
                    
                    <div className={styles.detallesActividad}>
                        {actividad.hora && (
                            <span className={styles.hora}>
                                <FontAwesomeIcon icon={faClock} />
                                {formatHora(actividad.hora)}
                            </span>
                        )}
                        
                        <span 
                            className={styles.prioridad}
                            style={{ backgroundColor: getPrioridadColor(actividad.prioridad) }}
                        >
                            {actividad.prioridad || 'media'}
                        </span>

                        {actividad.categoria && (
                            <span className={styles.categoria}>
                                {actividad.categoria}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Estado visual */}
            {actividad.completada && (
                <div className={styles.completadaBadge}>
                    <FontAwesomeIcon icon={faCheck} />
                    Completada
                </div>
            )}
        </div>
    );
}