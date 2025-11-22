import { useState, useEffect } from 'react';
import styles from './Inicio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { CarouselInicio } from '../components/Inicio/CarouselInicio';
import { NavBarInicio } from '../components/Inicio/NavBarInicio';
import { CardStatInicio } from '../components/Inicio/CardStatInicio';
import { ChatBot } from '../components/ChatBot';

import { auth } from '../firebase/firebaseConfig';
import { 
    getUser, 
    getProgresoDaily, 
    getActividadesByCategoria,
    checkAndUpdateLogros,
    getUserPhoto // Agregar esta importación
} from '../firebase/habits';

import waterIcon from '../assets/icons/water_drop.png';
import neurologyIcon from '../assets/icons/neurology.png';
import bedtimeIcon from '../assets/icons/bedtime.png';
import vitalsignsIcon from '../assets/icons/vital_signs.png';
import User1 from '../assets/image/default_user1.jpg';

export default function Inicio() {
    const [userData, setUserData] = useState(null);
    const [progresoHoy, setProgresoHoy] = useState(null);
    const [categoriaActiva, setCategoriaActiva] = useState('nutricion');
    const [actividades, setActividades] = useState([]);
    const [userPhoto, setUserPhoto] = useState(User1); // Agregar estado para la foto
    const [photoLoading, setPhotoLoading] = useState(true); // Estado de carga de la foto

    useEffect(() => {
        loadUserData();
        loadProgresoDaily();
        loadActividades('nutricion');
        loadUserPhoto(); // Cargar foto del usuario
    }, []);

    const loadUserData = async () => {
        if (auth.currentUser) {
            const result = await getUser(auth.currentUser.uid);
            if (result.success) {
                setUserData(result.data);
            }
        }
    };

    const loadProgresoDaily = async () => {
        if (auth.currentUser) {
            const today = new Date().toISOString().split('T')[0];
            const result = await getProgresoDaily(auth.currentUser.uid, today);
            if (result.success && result.data) {
                setProgresoHoy(result.data);
            } else {
                // Inicializar progreso del día si no existe para todas las actividades
                setProgresoHoy({
                    // Nutrición
                    hidratacion: { current: 0, total: 2 },
                    descanso: { current: 0, total: 8 },
                    // Relajación
                    meditacion: { current: 0, total: 10 },
                    respiracion: { current: 0, total: 5 },
                    // Ejercicios
                    cardio: { current: 0, total: 30 },
                    fuerza: { current: 0, total: 3 },
                    // Metas
                    actividad_fisica: { current: 0, total: 10000 }
                });
            }
            
            // Verificar logros después de cargar el progreso
            try {
                const logrosResult = await checkAndUpdateLogros(auth.currentUser.uid);
                if (logrosResult.success && logrosResult.logrosDesbloqueados.length > 0) {
                    // Mostrar notificación de nuevos logros (opcional)
                    logrosResult.logrosDesbloqueados.forEach(logro => {
                        console.log(`🏆 ¡Nuevo logro desbloqueado: ${logro.nombre}!`);
                        // Aquí podrías mostrar una notificación toast si quisieras
                    });
                }
            } catch (error) {
                console.error('Error verificando logros:', error);
            }
        }
    };

    const loadUserPhoto = async () => {
        if (auth.currentUser) {
            setPhotoLoading(true);
            try {
                const result = await getUserPhoto(auth.currentUser.uid);
                if (result.success && result.photoURL) {
                    setUserPhoto(result.photoURL);
                } else {
                    setUserPhoto(User1);
                }
            } catch (error) {
                console.error('Error loading user photo:', error);
                setUserPhoto(User1);
            } finally {
                setPhotoLoading(false);
            }
        } else {
            setUserPhoto(User1);
            setPhotoLoading(false);
        }
    };

    const loadActividades = async (categoria) => {
        const result = await getActividadesByCategoria(categoria);
        if (result.success) {
            setActividades(result.data);
        } else {
            // Datos por defecto si no hay actividades en la base de datos
            setActividades(getDefaultActividades(categoria));
        }
    };

    const getDefaultActividades = (categoria) => {
        const actividadesPorCategoria = {
            ejercicios: [
                {
                    id: 'cardio',
                    title: 'Cardio',
                    desc: 'Ejercicios cardiovasculares',
                    icon: vitalsignsIcon,
                    bgColor: '#F4D4D4',
                    progressCurrent: progresoHoy?.cardio?.current || 0,
                    progressTotal: progresoHoy?.cardio?.total || 30,
                    unit: 'min'
                },
                {
                    id: 'fuerza',
                    title: 'Fuerza',
                    desc: 'Entrenamiento de fuerza',
                    icon: vitalsignsIcon,
                    bgColor: '#E6D5B8',
                    progressCurrent: progresoHoy?.fuerza?.current || 0,
                    progressTotal: progresoHoy?.fuerza?.total || 3,
                    unit: 'series'
                }
            ],
            relajacion: [
                {
                    id: 'meditacion',
                    title: 'Meditación',
                    desc: 'Medita 10 minutos al día',
                    icon: neurologyIcon,
                    bgColor: '#E6D5B8',
                    progressCurrent: progresoHoy?.meditacion?.current || 0,
                    progressTotal: progresoHoy?.meditacion?.total || 10,
                    unit: 'min'
                },
                {
                    id: 'respiracion',
                    title: 'Respiración',
                    desc: 'Ejercicios de respiración',
                    icon: neurologyIcon,
                    bgColor: '#C1E1C1',
                    progressCurrent: progresoHoy?.respiracion?.current || 0,
                    progressTotal: progresoHoy?.respiracion?.total || 5,
                    unit: 'sesiones'
                }
            ],
            nutricion: [
                {
                    id: 'hidratacion',
                    title: 'Hidratación',
                    desc: 'Mantente hidratado durante el día',
                    icon: waterIcon,
                    bgColor: '#D4F1F4',
                    progressCurrent: progresoHoy?.hidratacion?.current || 0,
                    progressTotal: progresoHoy?.hidratacion?.total || 2,
                    unit: 'L'
                },
                {
                    id: 'descanso',
                    title: 'Descanso',
                    desc: 'Descanso reparador para tu mente',
                    icon: bedtimeIcon,
                    bgColor: '#C1E1C1',
                    progressCurrent: progresoHoy?.descanso?.current || 0,
                    progressTotal: progresoHoy?.descanso?.total || 8,
                    unit: 'horas'
                }
            ],
            metas: [
                {
                    id: 'actividad_fisica',
                    title: 'Actividad Física',
                    desc: 'Mantén activo tu cuerpo',
                    icon: vitalsignsIcon,
                    bgColor: '#F4D4D4',
                    progressCurrent: progresoHoy?.actividad_fisica?.current || 0,
                    progressTotal: progresoHoy?.actividad_fisica?.total || 10000,
                    unit: 'pasos'
                }
            ]
        };
        return actividadesPorCategoria[categoria] || [];
    };

    const handleCategoriaChange = async (categoria) => {
        setCategoriaActiva(categoria);
        await loadActividades(categoria);
    };

    const userName = userData?.nombreCompleto || userData?.nombres || 'Usuario';

    return (
        <div className={styles.contenedorInicio}>
            <header className={styles.headerInicio}>
                {photoLoading ? (
                    <div className={styles.photoSkeleton}></div>
                ) : (
                    <img className={styles.imgUser} src={userPhoto} alt="Foto de perfil" />
                )}
                <p>Hola,<br/><span className='font-weigth-bold'>{userName}!!</span></p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </header>
            
            <CarouselInicio />
            
            <NavBarInicio 
                categoriaActiva={categoriaActiva}
                onCategoriaChange={handleCategoriaChange}
            />

            {/* Renderizar actividades dinámicamente */}
            {actividades.length > 0 ? (
                actividades.map((actividad) => (
                    <CardStatInicio 
                        key={actividad.id}
                        icon={actividad.icon}
                        title={actividad.title}
                        desc={actividad.desc}
                        bgColor={actividad.bgColor}
                        progressCurrent={actividad.progressCurrent}
                        progressTotal={actividad.progressTotal}
                        unit={actividad.unit}
                        activityId={actividad.id}
                        onUpdate={() => loadProgresoDaily()}
                    />
                ))
            ) : (
                // Fallback a las actividades por defecto si no hay datos
                getDefaultActividades(categoriaActiva).map((actividad) => (
                    <CardStatInicio 
                        key={actividad.id}
                        icon={actividad.icon}
                        title={actividad.title}
                        desc={actividad.desc}
                        bgColor={actividad.bgColor}
                        progressCurrent={actividad.progressCurrent}
                        progressTotal={actividad.progressTotal}
                        unit={actividad.unit}
                        activityId={actividad.id}
                        onUpdate={() => loadProgresoDaily()}
                    />
                ))
            )}

            {/* ChatBot flotante */}
            <ChatBot />
        </div>
    );
}

