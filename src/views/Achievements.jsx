import styles from './Achievements.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MedallaCard } from '../components/Achievements/MedallaCard';

export default function Achievements() {
    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    // Datos de las medallas
    const medallas = [
        {
            id: 1,
            nombre: "Rookie del bienestar",
            descripcion: "Completaste tu primera semana de rutina.",
            porcentaje: 85,
            estadistica: "85% de las personas lo tiene",
            icono: "🌱",
            borderColor: "#4ECDC4",
            obtenida: true
        },
        {
            id: 2,
            nombre: "Constancia mensual",
            descripcion: "Mantuviste tu rutina durante un mes completo.",
            porcentaje: 50,
            estadistica: "50% de las personas lo tiene",
            icono: "🌿",
            borderColor: "#45B7D1",
            obtenida: true
        },
        {
            id: 3,
            nombre: "Maestro del equilibrio",
            descripcion: "Combinaste 3 actividades diferentes en la semana.",
            porcentaje: 70,
            estadistica: "70% de las personas lo tiene",
            icono: "⚖️",
            borderColor: "#FECA57",
            obtenida: true
        },
        {
            id: 4,
            nombre: "Reductor de estrés",
            descripcion: "Bajaste tu estrés promedio en 5 puntos este mes.",
            porcentaje: 25,
            estadistica: "25% de las personas lo tiene",
            icono: "😌",
            borderColor: "#FF6B6B",
            obtenida: true
        },
        {
            id: 5,
            nombre: "Asistente fiel",
            descripcion: "Completaste 25 sesiones de actividades esta semana.",
            porcentaje: 40,
            estadistica: "40% de las personas lo tiene",
            icono: "🤝",
            borderColor: "#96CEB4",
            obtenida: true
        },
        {
            id: 6,
            nombre: "Maratón del bienestar",
            descripcion: "Completó 4 semanas consecutivas sin fallar tu rutina.",
            porcentaje: 5,
            estadistica: "5% de las personas lo tiene",
            icono: "🏆",
            borderColor: "#FF6B6B",
            obtenida: true
        },
        {
            id: 7,
            nombre: "Maestro meditador",
            descripcion: "Realiza 14 días consecutivos de meditación diaria.",
            porcentaje: 10,
            estadistica: "10% de las personas lo tiene",
            icono: "🧘",
            borderColor: "#9b59b6",
            obtenida: true
        }
    ];

    return (
        <div className={styles.contenedorAchievements}>
            {/* Header con botón de volver */}
            <div className={styles.headerAchievements}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className={styles.titulo}>Mis logros</h2>
            </div>

            {/* Sección de medallas */}
            <div className={styles.seccionMedallas}>
                <h3 className={styles.subtitulo}>Medallas</h3>
            </div>

            {/* Lista de medallas */}
            <div className={styles.listaMedallas}>
                {medallas.map(medalla => (
                    <MedallaCard 
                        key={medalla.id}
                        {...medalla}
                    />
                ))}
            </div>
        </div>
    );
}