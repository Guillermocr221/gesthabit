import { useState, useEffect } from 'react';
import styles from './Stats.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GraficoEstres } from '../components/Stats/GraficoEstres';
import { GraficoActividades } from '../components/Stats/GraficoActividades';
import { GraficoPorcentajes } from '../components/Stats/GraficoPorcentajes';

import { auth } from '../firebase/firebaseConfig';
import { 
    getMetasDiariasCumplidas, 
    getProgresoSemanal, 
    getActividadesPorCategoriaSemana 
} from '../firebase/habits';

export default function Stats() {
    const [loading, setLoading] = useState(true);
    const [datosMetasDiarias, setDatosMetasDiarias] = useState(null);
    const [datosActividadesSemana, setDatosActividadesSemana] = useState([]);
    const [datosPorcentajesSemana, setDatosPorcentajesSemana] = useState([]);

    useEffect(() => {
        loadEstadisticas();
    }, []);

    const loadEstadisticas = async () => {
        if (!auth.currentUser) return;

        setLoading(true);
        try {
            // Cargar metas diarias cumplidas
            const metasResult = await getMetasDiariasCumplidas(auth.currentUser.uid);
            if (metasResult.success) {
                const metasData = metasResult.data;
                setDatosMetasDiarias({
                    mesActual: metasData.map(d => d.porcentaje),
                    fechas: metasData.map(d => d.fecha)
                });
            }

            // Cargar progreso semanal para el gráfico de barras
            const progresoResult = await getProgresoSemanal(auth.currentUser.uid);
            if (progresoResult.success) {
                console.log('📊 Datos de progreso semanal recibidos:', progresoResult.data);
                const actividadesData = progresoResult.data.map(dia => {
                    const progreso = dia.progreso || {};
                    return {
                        dia: dia.dia.charAt(0).toUpperCase() + dia.dia.slice(1),
                        actividades: [
                            { 
                                nombre: 'Hidratación', 
                                valor: progreso.hidratacion ? Math.round((progreso.hidratacion.current / progreso.hidratacion.total) * 10) : 0, 
                                color: '#4ECDC4' 
                            },
                            { 
                                nombre: 'Cardio', 
                                valor: progreso.cardio ? Math.round((progreso.cardio.current / progreso.cardio.total) * 10) : 0, 
                                color: '#FF6B6B' 
                            },
                            { 
                                nombre: 'Meditación', 
                                valor: progreso.meditacion ? Math.round((progreso.meditacion.current / progreso.meditacion.total) * 10) : 0, 
                                color: '#45B7D1' 
                            },
                            { 
                                nombre: 'Descanso', 
                                valor: progreso.descanso ? Math.round((progreso.descanso.current / progreso.descanso.total) * 10) : 0, 
                                color: '#96CEB4' 
                            }
                        ]
                    };
                });
                setDatosActividadesSemana(actividadesData);
            }

            // Cargar actividades por categoría para el gráfico de porcentajes
            const categoriasResult = await getActividadesPorCategoriaSemana(auth.currentUser.uid);
            if (categoriasResult.success) {
                console.log('📈 Datos de categorías recibidos:', categoriasResult.data);
                const categorias = categoriasResult.data;
                const total = Object.values(categorias).reduce((sum, count) => sum + count, 0);
                
                if (total > 0) {
                    const colores = {
                        ejercicio: '#45B7D1',
                        trabajo: '#FECA57',
                        personal: '#FF6B6B',
                        salud: '#4ECDC4',
                        estudio: '#9b59b6',
                        social: '#96CEB4',
                        hogar: '#e67e22',
                        entretenimiento: '#f39c12'
                    };

                    const porcentajesData = Object.entries(categorias)
                        .map(([categoria, count]) => ({
                            nombre: categoria.charAt(0).toUpperCase() + categoria.slice(1),
                            valor: Math.round((count / total) * 100),
                            color: colores[categoria] || '#747d8c',
                            actividades: count
                        }))
                        .sort((a, b) => b.valor - a.valor); // Ordenar por porcentaje descendente

                    setDatosPorcentajesSemana(porcentajesData);
                } else {
                    // Datos vacíos si no hay actividades completadas
                    setDatosPorcentajesSemana([]);
                }
            }

        } catch (error) {
            console.error('Error loading estadísticas:', error);
            // Cargar datos por defecto en caso de error
            // loadDefaultData();
        } finally {
            setLoading(false);
        }
    };

    const loadDefaultData = () => {
        // Datos por defecto para metas diarias
        setDatosMetasDiarias({
            mesActual: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
            fechas: Array.from({length: 30}, (_, i) => {
                const fecha = new Date();
                fecha.setDate(fecha.getDate() - (29 - i));
                return fecha.toISOString().split('T')[0];
            })
        });

        // Datos por defecto para actividades semanales
        setDatosActividadesSemana([
            { dia: 'Lunes', actividades: [
                { nombre: 'Hidratación', valor: 8, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 6, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 7, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 9, color: '#96CEB4' }
            ]},
            { dia: 'Martes', actividades: [
                { nombre: 'Hidratación', valor: 9, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 8, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 5, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 7, color: '#96CEB4' }
            ]},
            { dia: 'Miércoles', actividades: [
                { nombre: 'Hidratación', valor: 7, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 9, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 8, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 6, color: '#96CEB4' }
            ]},
            { dia: 'Jueves', actividades: [
                { nombre: 'Hidratación', valor: 10, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 7, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 9, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 8, color: '#96CEB4' }
            ]},
            { dia: 'Viernes', actividades: [
                { nombre: 'Hidratación', valor: 8, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 10, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 6, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 7, color: '#96CEB4' }
            ]},
            { dia: 'Sábado', actividades: [
                { nombre: 'Hidratación', valor: 9, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 8, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 10, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 9, color: '#96CEB4' }
            ]},
            { dia: 'Domingo', actividades: [
                { nombre: 'Hidratación', valor: 6, color: '#4ECDC4' },
                { nombre: 'Cardio', valor: 5, color: '#FF6B6B' },
                { nombre: 'Meditación', valor: 8, color: '#45B7D1' },
                { nombre: 'Descanso', valor: 10, color: '#96CEB4' }
            ]}
        ]);

        // Datos por defecto para porcentajes
        setDatosPorcentajesSemana([
            { nombre: 'Personal', valor: 35, color: '#FF6B6B', actividades: 7 },
            { nombre: 'Ejercicio', valor: 28, color: '#45B7D1', actividades: 6 },
            { nombre: 'Salud', valor: 22, color: '#4ECDC4', actividades: 4 },
            { nombre: 'Estudio', valor: 15, color: '#9b59b6', actividades: 3 }
        ]);
    };

    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    if (loading) {
        return (
            <div className={styles.contenedorStats}>
                <div className={styles.headerStats}>
                    
                    <h2 className={styles.titulo}>Mis estadísticas</h2>
                </div>
                <div className={styles.loading}>Cargando estadísticas...</div>
            </div>
        );
    }

    return (
        <div className={styles.contenedorStats}>
            {/* Header con botón de volver */}
            <div className={styles.headerStats}>
                
                <h2 className={styles.titulo}>Mis estadísticas</h2>
            </div>

            {/* Sección de metas diarias cumplidas */}
            <div className={styles.seccionEstres}>
                <h3 className={styles.subtitulo}>Metas diarias cumplidas</h3>
                {datosMetasDiarias && (
                    <GraficoEstres datos={datosMetasDiarias} />
                )}
            </div>

            {/* Secciones de actividades y porcentajes */}
            <div className={styles.seccionGraficos}>
                <div className={styles.columnaIzquierda}>
                    <h3 className={styles.subtitulo}>Progreso semanal</h3>
                    <GraficoActividades datos={datosActividadesSemana} />
                </div>

                <div className={styles.columnaDerecha}>
                    <h3 className={styles.subtitulo}>Actividades esta semana</h3>
                    <GraficoPorcentajes datos={datosPorcentajesSemana} />
                </div>
            </div>

            {/* Frase motivacional */}
            <div className={styles.fraseMotivacional}>
                <p>Tu constancia de hoy es el éxito de mañana. ¡Sigue así!</p>
            </div>
        </div>
    );
}