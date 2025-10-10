import { useState } from 'react';
import styles from './Activity.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CalendarioActividad } from '../components/Actividad/CalendarioActividad';
import { ActividadDiaria } from '../components/Actividad/ActividadDiaria';

// Iconos para las actividades
import waterIcon from '../assets/icons/water_drop.png';
import neurologyIcon from '../assets/icons/neurology.png';
import bedtimeIcon from '../assets/icons/bedtime.png';
import vitalsignsIcon from '../assets/icons/vital_signs.png';

export default function Activity() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Datos de ejemplo para las actividades del día
    const actividadesDelDia = [
        {
            id: 1,
            hora: "10:00",
            periodo: "AM",
            tipo: "CORRER",
            cantidadHecha: 2.5,
            meta: "Meta 2.5 km",
            icono: vitalsignsIcon,
            borderColor: "#FF6B6B",
            completada: true
        },
        {
            id: 2,
            hora: "12:00",
            periodo: "AM",
            tipo: "YOGA",
            cantidadHecha: 30,
            meta: "Meta 30 min",
            icono: neurologyIcon,
            borderColor: "#4ECDC4",
            completada: true
        },
        {
            id: 3,
            hora: "3:00",
            periodo: "PM",
            tipo: "GYM",
            cantidadHecha: 1,
            meta: "Meta 1 hora",
            icono: vitalsignsIcon,
            borderColor: "#45B7D1",
            completada: true
        },
        {
            id: 4,
            hora: "5:00",
            periodo: "PM",
            tipo: "Tai Chi",
            cantidadHecha: 30,
            meta: "Meta 30 min",
            icono: bedtimeIcon,
            borderColor: "#96CEB4",
            completada: true
        },
        {
            id: 5,
            hora: "9:00",
            periodo: "PM",
            tipo: "Guitarra",
            cantidadHecha: 30,
            meta: "Meta 30 min",
            icono: neurologyIcon,
            borderColor: "#FECA57",
            completada: true
        }
    ];

    const handleVolver = () => {
        // Aquí puedes agregar la lógica para volver al inicio
        console.log("Volver al inicio");
    };

    return (
        <div className={styles.contenedorActivity}>
            {/* Header con botón de volver */}
            <div className={styles.headerActivity}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className={styles.titulo}>Mis actividades</h2>
            </div>

            {/* Calendario */}
            <CalendarioActividad 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
            />

            {/* Actividades del día */}
            <div className={styles.actividadSection}>
                <h3 className={styles.subtitulo}>Actividad diaria</h3>
                <div className={styles.verTodo}>
                    <span>Ver todo</span>
                </div>
            </div>

            {/* Lista de actividades */}
            <div className={styles.listaActividades}>
                {actividadesDelDia.map(actividad => (
                    <ActividadDiaria 
                        key={actividad.id}
                        {...actividad}
                    />
                ))}
            </div>
        </div>
    );
}