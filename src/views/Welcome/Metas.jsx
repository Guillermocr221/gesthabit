import { useState } from 'react';
import styles from './Metas.module.css';
import { BotonSiguiente } from '../../components/Welcome/BotonSiguiente';

export default function Metas({ onNext }) {
    const [selectedGoals, setSelectedGoals] = useState([]);

    const goals = [
        "Mejorar la calidad del sueño con rutinas de descanso saludable.",
        "Manejar la ansiedad en épocas de exámenes mediante técnicas de relajación.",
        "Reducir el cansancio mental organizando mejor el tiempo de estudio y descanso.",
        "Adoptar hábitos de estudio saludables y sostenibles.",
        "Desarrollar una rutina de ejercicio regular.",
        "Mantener una alimentación balanceada y nutritiva.",
        "Practicar mindfulness y meditación diariamente."
    ];

    const handleGoalToggle = (goal) => {
        setSelectedGoals(prev => {
            if (prev.includes(goal)) {
                return prev.filter(g => g !== goal);
            } else {
                return [...prev, goal];
            }
        });
    };

    const handleNext = () => {
        if (selectedGoals.length > 0) {
            onNext({ goals: selectedGoals, isComplete: true });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.titulo}>DEFINE TUS METAS Y AVANCEMOS JUNTOS HACIA ELLAS.</h2>
                <p className={styles.subtitulo}>
                    Establece objetivos claros como mejorar tu 
                    alimentación o reducir el estrés.
                </p>

                <div className={styles.goalsContainer}>
                    {goals.map((goal, index) => (
                        <button
                            key={index}
                            className={`${styles.goalButton} ${selectedGoals.includes(goal) ? styles.selected : ''}`}
                            onClick={() => handleGoalToggle(goal)}
                        >
                            {goal}
                        </button>
                    ))}
                </div>

                <BotonSiguiente 
                    onNext={handleNext} 
                    disabled={selectedGoals.length === 0}
                    label="Empezar"
                />
            </div>
        </div>
    );
}