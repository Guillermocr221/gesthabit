import { useState } from 'react';
import styles from './Stats.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GraficoEstres } from '../components/Stats/GraficoEstres';
import { GraficoActividades } from '../components/Stats/GraficoActividades';
import { GraficoPorcentajes } from '../components/Stats/GraficoPorcentajes';

export default function Stats() {
    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    // Datos para el gráfico de estrés
    const datosEstres = {
        mesActual: [7, 5, 8, 6, 9, 4, 7, 8, 5, 6, 8, 7, 6, 9, 5, 7, 8, 6, 8, 7, 9, 6, 8, 7, 5, 9, 6, 8, 7, 8],
        mesPasado: [9, 7, 8, 6, 5, 3, 4, 2, 3, 4, 3, 2, 5, 4, 3, 2, 4, 3, 2, 3, 2, 1, 2, 3, 2, 1, 2, 2, 1, 2]
    };

    // Datos para actividades (barras)
    const datosActividades = [
        { dia: 'Lunes', actividades: [
            { nombre: 'Correr', valor: 5, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 7, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 4, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 6, color: '#96CEB4' }
        ]},
        { dia: 'Martes', actividades: [
            { nombre: 'Correr', valor: 6, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 5, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 8, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 4, color: '#96CEB4' }
        ]},
        { dia: 'Miércoles', actividades: [
            { nombre: 'Correr', valor: 7, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 6, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 5, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 8, color: '#96CEB4' }
        ]},
        { dia: 'Jueves', actividades: [
            { nombre: 'Correr', valor: 4, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 8, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 6, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 5, color: '#96CEB4' }
        ]},
        { dia: 'Viernes', actividades: [
            { nombre: 'Correr', valor: 8, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 4, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 7, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 6, color: '#96CEB4' }
        ]},
        { dia: 'Sábado', actividades: [
            { nombre: 'Correr', valor: 5, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 7, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 9, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 3, color: '#96CEB4' }
        ]},
        { dia: 'Domingo', actividades: [
            { nombre: 'Correr', valor: 6, color: '#FF6B6B' },
            { nombre: 'Yoga', valor: 5, color: '#4ECDC4' },
            { nombre: 'GYM', valor: 4, color: '#45B7D1' },
            { nombre: 'Tai Chi', valor: 7, color: '#96CEB4' }
        ]}
    ];

    // Datos para porcentajes (pie chart)
    const datosPorcentajes = [
        { nombre: 'Correr', valor: 29, color: '#45B7D1', minutos: 348 },
        { nombre: 'Yoga', valor: 27, color: '#FECA57', minutos: 324 },
        { nombre: 'GYM', valor: 24, color: '#FF6B6B', minutos: 288 },
        { nombre: 'Tai Chi', valor: 14, color: '#4ECDC4', minutos: 168 },
        { nombre: 'Meditación', valor: 6, color: '#9b59b6', minutos: 72 }
    ];

    return (
        <div className={styles.contenedorStats}>
            {/* Header con botón de volver */}
            <div className={styles.headerStats}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className={styles.titulo}>Mis estadísticas</h2>
            </div>

            {/* Sección de estrés */}
            <div className={styles.seccionEstres}>
                <h3 className={styles.subtitulo}>Cómo mejoro día a día</h3>
                <GraficoEstres datos={datosEstres} />
            </div>

            {/* Secciones de actividades y porcentajes */}
            <div className={styles.seccionGraficos}>
                <div className={styles.columnaIzquierda}>
                    <h3 className={styles.subtitulo}>Actividades</h3>
                    <GraficoActividades datos={datosActividades} />
                </div>

                <div className={styles.columnaDerecha}>
                    <h3 className={styles.subtitulo}>Porcentajes</h3>
                    <GraficoPorcentajes datos={datosPorcentajes} />
                </div>
            </div>

            {/* Frase motivacional */}
            <div className={styles.fraseMotivacional}>
                <p>Cada minuto que dedico a mí mismo suma para mi bienestar.</p>
            </div>
        </div>
    );
}