import { useState, useEffect } from 'react';
import styles from './CarouselInicio.module.css';
import { getConsejos, getUser } from '../../firebase/habits';
import { auth } from '../../firebase/firebaseConfig';

// Importar todas las imágenes
import meditacionHombre from '../../assets/image/meditacion_hombre.png';
import meditacionMujer from '../../assets/image/meditacion_mujer.png';
import nutricionistaHombre from '../../assets/image/nutricionista_hombre.png';
import nutricionistaMujer from '../../assets/image/nutricionista_mujer.png';
import planificacionHombre from '../../assets/image/planificacion_hombre.png';
import planificacionMujer from '../../assets/image/planificacion_mujer.png';
import runnerHombre from '../../assets/image/runner_hombre.png';
import runnerMujer from '../../assets/image/runner_mujer.png';

export function CarouselInicio() {
    const [consejos, setConsejos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userGender, setUserGender] = useState('male'); // default

    useEffect(() => {
        loadConsejos();
        loadUserGender();
    }, []);

    const loadUserGender = async () => {
        if (auth.currentUser) {
            const result = await getUser(auth.currentUser.uid);
            if (result.success && result.data.genero) {
                // Convertir "Masculino"/"Femenino" a "male"/"female"
                const gender = result.data.genero.toLowerCase() === 'masculino' ? 'male' : 'female';
                setUserGender(gender);
            }
        }
    };

    const loadConsejos = async () => {
        const result = await getConsejos();
        if (result.success && result.data.length > 0) {
            setConsejos(result.data);
        } else {
            // Consejos por defecto si no hay en la base de datos
            setConsejos(getDefaultConsejos());
        }
    };

    const getImageByCategory = (categoria, gender = userGender) => {
        const imageMap = {
            ejercicios: {
                male: runnerHombre,
                female: runnerMujer
            },
            relajacion: {
                male: meditacionHombre,
                female: meditacionMujer
            },
            nutricion: {
                male: nutricionistaHombre,
                female: nutricionistaMujer
            },
            metas: {
                male: planificacionHombre,
                female: planificacionMujer
            },
            descanso: {
                male: meditacionHombre,
                female: meditacionMujer
            }
        };

        return imageMap[categoria]?.[gender] || imageMap.ejercicios.male;
    };

    const getDefaultConsejos = () => [
        {
            id: 1,
            titulo: "¡Refresca tu cuerpo corriendo!",
            categoria: "ejercicios",
            descripcion: "El running mejora tu resistencia cardiovascular y libera endorfinas."
        },
        {
            id: 2,
            titulo: "Medita por tu bienestar",
            categoria: "relajacion",
            descripcion: "10 minutos de meditación diaria reducen el estrés significativamente."
        },
        {
            id: 3,
            titulo: "Hidrátate adecuadamente",
            categoria: "nutricion",
            descripcion: "Beber 2 litros de agua al día mejora tu concentración y energía."
        },
        {
            id: 4,
            titulo: "Establece metas claras",
            categoria: "metas",
            descripcion: "Las metas específicas te ayudan a mantener el enfoque y la motivación."
        },
        {
            id: 5,
            titulo: "Duerme 8 horas diarias",
            categoria: "descanso",
            descripcion: "Un buen descanso es fundamental para la recuperación física y mental."
        },
        {
            id: 6,
            titulo: "Ejercicios de respiración",
            categoria: "relajacion",
            descripcion: "La respiración profunda activa el sistema nervioso parasimpático."
        }
    ];

    const goToConsejo = (index) => {
        setCurrentIndex(index);
    };

    if (consejos.length === 0) return null;

    const currentConsejo = consejos[currentIndex];

    return (
        <div>
            <div className={styles.cardCarousel}>
                <div className={styles.contenido}>
                    <h4>{currentConsejo.titulo}</h4>
                    <p className={styles.descripcionActividad}>
                        {currentConsejo.descripcion}
                    </p>
                </div>
                <div className={styles.contenedorImagen}>
                    <img 
                        src={getImageByCategory(currentConsejo.categoria)} 
                        alt={currentConsejo.titulo} 
                    />
                </div>
            </div>

            <div className={styles.buttonsCarousel}>
                {consejos.map((_, index) => (
                    <div 
                        key={index}
                        className={`${styles.botonCarousel} ${index === currentIndex ? styles.botonCarouselActivo : ''}`}
                        onClick={() => goToConsejo(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

