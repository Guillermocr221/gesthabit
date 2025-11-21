import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';
import { PerfilInfo } from '../components/Profile/PerfilInfo';
import { PerfilDificultades } from '../components/Profile/PerfilDificultades';
import { PerfilMetas } from '../components/Profile/PerfilMetas';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../firebase/auth';

export default function Profile() {
    const navigate = useNavigate();

    const handleVolver = () => {
        console.log("Volver al inicio");
    };

    const handleConfiguracion = () => {
        navigate('/edit-profile');
    };

    const handleCerrarSesion = async () => {
        await logoutUser();
        navigate('/');
    };

    // Datos del usuario
    const datosUsuario = {
        nombre: "Diego Fernando Ramirez",
        correo: "diego.fernando.ramire@gmail.com",
        telefono: "962749778",
        genero: "Masculino",
        fotoPerfil: "/src/assets/image/default_user1.jpg"
    };

    // Dificultades del usuario
    const dificultades = [
        "Se me olvida para descansar por exceso de tareas o desvelos antes de exámenes.",
        "Tengo preocupación excesiva por notas, trabajos y exámenes.",
        "Tengo miedo al fracaso o a no cumplir expectativas familiares y académicas."
    ];

    // Metas del usuario
    const metas = [
        "Mejorar la calidad del sueño con rutinas de descanso saludable.",
        "Manejar la ansiedad en épocas de exámenes mediante técnicas de relajación.",
        "Reducir el cansancio mental organizando mejor el tiempo de estudio y descanso.",
        "Adoptar hábitos de estudio saludables y sostenibles."
    ];

    return (
        <div className={styles.contenedorProfile}>
            {/* Header con botones */}
            <div className={styles.headerProfile}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button className={styles.botonConfiguracion} onClick={handleConfiguracion}>
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>

            {/* Información del perfil */}
            <PerfilInfo usuario={datosUsuario} />

            {/* Dificultades */}
            <PerfilDificultades dificultades={dificultades} />

            {/* Metas y objetivos */}
            <PerfilMetas metas={metas} />

            {/* Botón cerrar sesión */}
            <div className={styles.botonCerrarContainer}>
                <button className={styles.botonCerrarSesion} onClick={handleCerrarSesion}>
                    Cerrar cuenta
                </button>
            </div>
        </div>
    );
}