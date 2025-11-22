import { useState, useEffect } from 'react';
import styles from './Activity.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import { ActividadDiaria } from '../components/Actividad/ActividadDiaria';
import { CalendarioActividad } from '../components/Actividad/CalendarioActividad';
import { ModalAgregarActividad } from '../components/Actividad/ModalAgregarActividad';

import { auth } from '../firebase/firebaseConfig';
import { getActividadesUsuario, createActividad, updateActividadCompletada, checkAndUpdateLogros } from '../firebase/habits';

export default function Activity() {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    const [actividades, setActividades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadActividades();
    }, [fechaSeleccionada]);

    const loadActividades = async () => {
        if (auth.currentUser) {
            setLoading(true);
            try {
                const result = await getActividadesUsuario(auth.currentUser.uid, fechaSeleccionada);
                if (result.success) {
                    setActividades(result.data);
                } else {
                    console.error('Error loading actividades:', result.error);
                    setActividades([]); // Mostrar lista vacía en caso de error
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                setActividades([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFechaChange = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    const handleCompletarActividad = async (actividadId, completada) => {
        try {
            const result = await updateActividadCompletada(actividadId, completada);
            if (result.success) {
                await loadActividades(); // Recargar actividades
                
                // Verificar logros después de completar una actividad
                if (completada && auth.currentUser) {
                    try {
                        const logrosResult = await checkAndUpdateLogros(auth.currentUser.uid);
                        if (logrosResult.success && logrosResult.logrosDesbloqueados.length > 0) {
                            // Mostrar notificación de nuevos logros
                            logrosResult.logrosDesbloqueados.forEach(logro => {
                                console.log(`🏆 ¡Nuevo logro desbloqueado: ${logro.nombre}!`);
                                // Aquí podrías mostrar una notificación toast
                            });
                        }
                    } catch (error) {
                        console.error('Error verificando logros:', error);
                    }
                }
            } else {
                alert('Error al actualizar la actividad. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error completando actividad:', error);
            alert('Error al actualizar la actividad. Intenta de nuevo.');
        }
    };

    const handleAgregarActividad = async (nuevaActividad) => {
        console.log('=== INICIANDO CREACIÓN DE ACTIVIDAD ===');
        console.log('Usuario actual:', auth.currentUser?.uid);
        console.log('Fecha seleccionada:', fechaSeleccionada);
        console.log('Datos de actividad:', nuevaActividad);
        
        if (auth.currentUser) {
            const actividadData = {
                ...nuevaActividad,
                fecha: fechaSeleccionada,
                completada: false
            };

            console.log('Datos completos a guardar:', actividadData);

            try {
                const result = await createActividad(auth.currentUser.uid, actividadData);
                console.log('Resultado de createActividad:', result);
                
                if (result.success) {
                    console.log('✅ Actividad creada exitosamente con ID:', result.id);
                    setShowModal(false);
                    await loadActividades(); // Recargar actividades
                    
                    // Verificar logros después de crear una actividad
                    try {
                        const logrosResult = await checkAndUpdateLogros(auth.currentUser.uid);
                        if (logrosResult.success && logrosResult.logrosDesbloqueados.length > 0) {
                            logrosResult.logrosDesbloqueados.forEach(logro => {
                                console.log(`🏆 ¡Nuevo logro desbloqueado: ${logro.nombre}!`);
                            });
                        }
                    } catch (error) {
                        console.error('Error verificando logros:', error);
                    }
                } else {
                    console.error('❌ Error en createActividad:', result.error);
                    alert('Error al crear la actividad: ' + result.error);
                }
            } catch (error) {
                console.error('❌ Error inesperado creando actividad:', error);
                alert('Error inesperado al crear la actividad. Revisa la consola.');
            }
        } else {
            console.error('❌ No hay usuario autenticado');
            alert('No hay usuario autenticado');
        }
    };

    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    const today = new Date().toISOString().split('T')[0];
    const isToday = fechaSeleccionada === today;
    const isFuture = fechaSeleccionada > today;

    return (
        <div className={styles.contenedorActivity}>
            {/* Header */}
            <div className={styles.headerActivity}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className={styles.titulo}>Mis actividades</h2>
                <button 
                    className={styles.botonAgregar} 
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            {/* Calendario */}
            <CalendarioActividad 
                fechaSeleccionada={fechaSeleccionada}
                onFechaChange={handleFechaChange}
                actividades={actividades}
            />

            {/* Actividades del día */}
            <div className={styles.seccionActividades}>
                <h3 className={styles.subtitulo}>
                    {isToday ? 'Actividades de hoy' : 
                     isFuture ? `Actividades programadas` : 
                     'Actividades del día'}
                </h3>

                {loading ? (
                    <div className={styles.loading}>Cargando actividades...</div>
                ) : actividades.length > 0 ? (
                    actividades.map((actividad) => (
                        <ActividadDiaria
                            key={actividad.id}
                            actividad={actividad}
                            onCompletar={handleCompletarActividad}
                            isEditable={!isFuture} // Solo se puede completar si no es futuro
                        />
                    ))
                ) : (
                    <div className={styles.noActividades}>
                        <p>No hay actividades programadas para este día</p>
                        <button 
                            className={styles.botonProgramar}
                            onClick={() => setShowModal(true)}
                        >
                            Programar actividad
                        </button>
                    </div>
                )}
            </div>

            {/* Modal para agregar actividad */}
            {showModal && (
                <ModalAgregarActividad
                    fechaSeleccionada={fechaSeleccionada}
                    onClose={() => setShowModal(false)}
                    onAgregar={handleAgregarActividad}
                />
            )}
        </div>
    );
}