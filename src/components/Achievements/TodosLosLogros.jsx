import { useState, useEffect } from 'react';
import styles from './TodosLosLogros.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';

export function TodosLosLogros({ isOpen, onClose, logros, userLogros }) {
    const [filtro, setFiltro] = useState('todos');

    if (!isOpen) return null;

    const logrosConEstado = logros.map(logro => {
        const obtenido = userLogros.logrosObtenidos?.includes(logro.id) || false;
        const progreso = userLogros.progreso?.[logro.id] || 0;
        const porcentajeProgreso = Math.min((progreso / logro.valorRequerido) * 100, 100);

        return {
            ...logro,
            obtenido,
            progreso,
            porcentajeProgreso
        };
    });

    const logrosFiltrados = logrosConEstado.filter(logro => {
        if (filtro === 'obtenidos') return logro.obtenido;
        if (filtro === 'pendientes') return !logro.obtenido;
        return true;
    });

    const getRarezaColor = (rareza) => {
        const colores = {
            'comun': '#95a5a6',
            'raro': '#3498db',
            'epico': '#9b59b6',
            'legendario': '#f39c12'
        };
        return colores[rareza] || '#95a5a6';
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Todos los logros</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className={styles.filtros}>
                    <button 
                        className={`${styles.filtroBtn} ${filtro === 'todos' ? styles.activo : ''}`}
                        onClick={() => setFiltro('todos')}
                    >
                        Todos ({logrosConEstado.length})
                    </button>
                    <button 
                        className={`${styles.filtroBtn} ${filtro === 'obtenidos' ? styles.activo : ''}`}
                        onClick={() => setFiltro('obtenidos')}
                    >
                        Obtenidos ({logrosConEstado.filter(l => l.obtenido).length})
                    </button>
                    <button 
                        className={`${styles.filtroBtn} ${filtro === 'pendientes' ? styles.activo : ''}`}
                        onClick={() => setFiltro('pendientes')}
                    >
                        Pendientes ({logrosConEstado.filter(l => !l.obtenido).length})
                    </button>
                </div>

                <div className={styles.logrosGrid}>
                    {logrosFiltrados.map(logro => (
                        <div 
                            key={logro.id} 
                            className={`${styles.logroCard} ${logro.obtenido ? styles.obtenido : styles.bloqueado}`}
                        >
                            <div className={styles.logroHeader}>
                                <div className={styles.iconoContainer}>
                                    <span className={styles.icono}>{logro.icono}</span>
                                    {logro.obtenido ? (
                                        <div className={styles.checkMark}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                    ) : (
                                        <div className={styles.lockIcon}>
                                            <FontAwesomeIcon icon={faLock} />
                                        </div>
                                    )}
                                </div>
                                <div 
                                    className={styles.rarezaBadge}
                                    style={{ backgroundColor: getRarezaColor(logro.rareza) }}
                                >
                                    {logro.rareza}
                                </div>
                            </div>

                            <div className={styles.logroInfo}>
                                <h4 className={styles.nombre}>{logro.nombre}</h4>
                                <p className={styles.descripcion}>{logro.descripcion}</p>
                                
                                {!logro.obtenido && (
                                    <div className={styles.progreso}>
                                        <div className={styles.progresoBar}>
                                            <div 
                                                className={styles.progresoFill}
                                                style={{ 
                                                    width: `${logro.porcentajeProgreso}%`,
                                                    backgroundColor: logro.borderColor 
                                                }}
                                            ></div>
                                        </div>
                                        <span className={styles.progresoTexto}>
                                            {logro.progreso} / {logro.valorRequerido}
                                        </span>
                                    </div>
                                )}

                                <div className={styles.logroFooter}>
                                    <span className={styles.categoria}>{logro.categoria}</span>
                                    <span className={styles.puntos}>{logro.puntos} pts</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {logrosFiltrados.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No hay logros en esta categoría</p>
                    </div>
                )}
            </div>
        </div>
    );
}