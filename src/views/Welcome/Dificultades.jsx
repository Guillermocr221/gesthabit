import { useState } from 'react';
import styles from './Dificultades.module.css';
import { BotonSiguiente } from '../../components/Welcome/BotonSiguiente';

export default function Dificultades({ onNext }) {
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);

    const difficulties = [
        "Se me olvida descansar por exceso de tareas o desvelos antes de exámenes.",
        "Tengo preocupación excesiva por notas, trabajos y exámenes.",
        "Tengo miedo al fracaso o a no cumplir expectativas familiares y académicas.",
        "Tengo dificultades para mantener una rutina de ejercicios.",
        "Me cuesta mantener una alimentación saludable.",
        "Tengo problemas para gestionar mi tiempo efectivamente."
    ];

    const handleDifficultyToggle = (difficulty) => {
        setSelectedDifficulties(prev => {
            if (prev.includes(difficulty)) {
                return prev.filter(d => d !== difficulty);
            } else {
                return [...prev, difficulty];
            }
        });
    };

    const handleNext = () => {
        if (selectedDifficulties.length > 0) {
            onNext({ difficulties: selectedDifficulties });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.titulo}>COMPÁRTENOS LAS DIFICULTADES QUE ENFRENTAS.</h2>
                <p className={styles.subtitulo}>
                    Nos gustaría saber cuáles son tus principales 
                    dificultades, para poder apoyarte mejor.
                </p>

                <div className={styles.difficultiesContainer}>
                    {difficulties.map((difficulty, index) => (
                        <button
                            key={index}
                            className={`${styles.difficultyButton} ${selectedDifficulties.includes(difficulty) ? styles.selected : ''}`}
                            onClick={() => handleDifficultyToggle(difficulty)}
                        >
                            {difficulty}
                        </button>
                    ))}
                </div>

                <BotonSiguiente 
                    onNext={handleNext} 
                    disabled={selectedDifficulties.length === 0}
                />
            </div>
        </div>
    );
}