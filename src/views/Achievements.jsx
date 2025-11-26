import { useState, useEffect } from 'react';
import styles from './Achievements.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faList, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { MedallaCard } from '../components/Achievements/MedallaCard';
import { TodosLosLogros } from '../components/Achievements/TodosLosLogros';

import { auth } from '../firebase/firebaseConfig';
import { 
    initializeLogros, 
    getLogros, 
    getUserLogros, 
    checkAndUpdateLogros 
} from '../firebase/habits';

export default function Achievements() {
    const [loading, setLoading] = useState(true);
    const [logros, setLogros] = useState([]);
    const [userLogros, setUserLogros] = useState({ logrosObtenidos: [], progreso: {}, puntosTotal: 0 });
    const [showAllLogros, setShowAllLogros] = useState(false);
    const [logrosRecientes, setLogrosRecientes] = useState([]);

    useEffect(() => {
        initializeAchievements();
    }, []);

    const initializeAchievements = async () => {
        if (!auth.currentUser) return;

        setLoading(true);
        try {
            // Inicializar logros en la base de datos si no existen
            await initializeLogros();

            // Cargar todos los logros
            const logrosResult = await getLogros();
            if (logrosResult.success) {
                setLogros(logrosResult.data);
            }

            // Cargar logros del usuario
            await loadUserLogros();

            // Verificar y actualizar logros del usuario
            const updateResult = await checkAndUpdateLogros(auth.currentUser.uid);
            if (updateResult.success && updateResult.logrosDesbloqueados.length > 0) {
                setLogrosRecientes(updateResult.logrosDesbloqueados);
                // Mostrar notificación de nuevos logros
                updateResult.logrosDesbloqueados.forEach(logro => {
                    console.log(`¡Nuevo logro desbloqueado: ${logro.nombre}!`);
                });
                // Recargar logros del usuario después de la actualización
                await loadUserLogros();
            }

        } catch (error) {
            console.error('Error initializing achievements:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserLogros = async () => {
        if (!auth.currentUser) return;

        try {
            const userLogrosResult = await getUserLogros(auth.currentUser.uid);
            if (userLogrosResult.success) {
                setUserLogros(userLogrosResult.data);
            }
        } catch (error) {
            console.error('Error loading user logros:', error);
        }
    };

    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    const handleShowAllLogros = () => {
        setShowAllLogros(true);
    };

    const handleCloseAllLogros = () => {
        setShowAllLogros(false);
    };

    // Filtrar solo las medallas obtenidas para mostrar en la vista principal
    const medallasObtenidas = logros.filter(logro => 
        userLogros.logrosObtenidos?.includes(logro.id)
    ).map(logro => {
        // Calcular estadística basada en la rareza
        const porcentajePorRareza = {
            'comun': 85,
            'raro': 50,
            'epico': 25,
            'legendario': 5
        };

        return {
            id: logro.id,
            nombre: logro.nombre,
            descripcion: logro.descripcion,
            porcentaje: porcentajePorRareza[logro.rareza] || 50,
            estadistica: `${porcentajePorRareza[logro.rareza] || 50}% de las personas lo tiene`,
            icono: logro.icono,
            borderColor: logro.borderColor,
            obtenida: true
        };
    });

    if (loading) {
        return (
            <div className={styles.contenedorAchievements}>
                <div className={styles.headerAchievements}>
                    <h2 className={styles.titulo}>Mis logros</h2>
                </div>
                <div className={styles.loading}>Cargando logros...</div>
            </div>
        );
    }

    return (
        <div className={styles.contenedorAchievements}>
            {/* Header con botón de volver */}
            <div className={styles.headerAchievements}>
                <h2 className={styles.titulo}>Mis logros</h2>
            </div>

            {/* Estadísticas del usuario */}
            <div className={styles.estadisticasContainer}>
                <div className={styles.estadistica}>
                    <div className={styles.estadisticaIcono}>
                        <FontAwesomeIcon icon={faTrophy} />
                    </div>
                    <div className={styles.estadisticaInfo}>
                        <span className={styles.estadisticaNumero}>{userLogros.logrosObtenidos?.length || 0}</span>
                        <span className={styles.estadisticaLabel}>Logros obtenidos</span>
                    </div>
                </div>
                <div className={styles.estadistica}>
                    <div className={styles.estadisticaIcono}>
                        <FontAwesomeIcon icon={faList} />
                    </div>
                    <div className={styles.estadisticaInfo}>
                        <span className={styles.estadisticaNumero}>{userLogros.puntosTotal || 0}</span>
                        <span className={styles.estadisticaLabel}>Puntos totales</span>
                    </div>
                </div>
            </div>

            {/* Botón para ver todos los logros */}
            <div className={styles.accionesContainer}>
                <button className={styles.botonVerTodos} onClick={handleShowAllLogros}>
                    <FontAwesomeIcon icon={faList} />
                    Ver todos los logros ({logros.length})
                </button>
            </div>

            {/* Sección de medallas obtenidas */}
            <div className={styles.seccionMedallas}>
                <h3 className={styles.subtitulo}>
                    Medallas obtenidas ({medallasObtenidas.length})
                </h3>
            </div>

            {/* Lista de medallas obtenidas */}
            {medallasObtenidas.length > 0 ? (
                <div className={styles.listaMedallas}>
                    {medallasObtenidas.map(medalla => (
                        <MedallaCard 
                            key={medalla.id}
                            {...medalla}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.sinMedallas}>
                    <div className={styles.sinMedallasIcono}>🏆</div>
                    <h4>¡Aún no tienes medallas!</h4>
                    <p>Completa actividades y cumple tus metas diarias para desbloquear logros increíbles.</p>
                    <button className={styles.botonEmpezar} onClick={handleShowAllLogros}>
                        Ver logros disponibles
                    </button>
                </div>
            )}

            {/* Modal de todos los logros */}
            <TodosLosLogros 
                isOpen={showAllLogros}
                onClose={handleCloseAllLogros}
                logros={logros}
                userLogros={userLogros}
            />

            {/* Notificación de logros recientes */}
            {logrosRecientes.length > 0 && (
                <div className={styles.notificacionLogros}>
                    <h4>¡Nuevos logros desbloqueados!</h4>
                    {logrosRecientes.map(logro => (
                        <div key={logro.id} className={styles.logroReciente}>
                            <span className={styles.logroIcono}>{logro.icono}</span>
                            <span>{logro.nombre}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}