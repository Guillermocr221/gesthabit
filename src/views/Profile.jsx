import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog } from '@fortawesome/free-solid-svg-icons';
import { PerfilInfo } from '../components/Profile/PerfilInfo';
import { PerfilDificultades } from '../components/Profile/PerfilDificultades';
import { PerfilMetas } from '../components/Profile/PerfilMetas';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { getUser } from '../firebase/habits';

export default function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        if (!auth.currentUser) {
            navigate('/');
            return;
        }

        setLoading(true);
        try {
            const result = await getUser(auth.currentUser.uid);
            if (result.success) {
                setUserData(result.data);
            } else {
                console.error('Error loading user data:', result.error);
                // Usar datos por defecto si hay error
                setUserData({
                    nombres: auth.currentUser.displayName?.split(' ')[0] || 'Usuario',
                    apellidos: auth.currentUser.displayName?.split(' ').slice(1).join(' ') || '',
                    email: auth.currentUser.email || '',
                    telefono: '',
                    genero: '',
                    edad: '',
                    dificultades: [],
                    metas: []
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleConfiguracion = () => {
        navigate('/edit-profile');
    };

    const handleCerrarSesion = async () => {
        try {
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (loading) {
        return (
            <div className={styles.contenedorProfile}>
                <div className={styles.headerProfile}>
                    <button className={styles.botonConfiguracion} onClick={handleConfiguracion}>
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
                <div className={styles.loading}>Cargando perfil...</div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className={styles.contenedorProfile}>
                <div className={styles.headerProfile}>
                    <button className={styles.botonConfiguracion} onClick={handleConfiguracion}>
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </div>
                <div className={styles.error}>Error al cargar los datos del usuario</div>
            </div>
        );
    }

    // Formatear datos del usuario para los componentes
    const datosUsuario = {
        nombre: userData.nombreCompleto || `${userData.nombres || ''} ${userData.apellidos || ''}`.trim(),
        correo: userData.email || auth.currentUser?.email || '',
        telefono: userData.telefono || 'No especificado',
        genero: userData.genero || 'No especificado',
        edad: userData.edad || 'No especificada',
        fotoPerfil: userData.photoURL || auth.currentUser?.photoURL || "/src/assets/image/default_user1.jpg"
    };

    // Dificultades del usuario
    const dificultades = userData.dificultades && userData.dificultades.length > 0 
        ? userData.dificultades 
        : ["No has especificado dificultades aún."];

    // Metas del usuario
    const metas = userData.metas && userData.metas.length > 0 
        ? userData.metas 
        : ["No has especificado metas aún."];

    return (
        <div className={styles.contenedorProfile}>
            {/* Header con botones */}
            <div className={styles.headerProfile}>
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
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}