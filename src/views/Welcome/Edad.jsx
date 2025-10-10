import { useState } from 'react';
import styles from './Edad.module.css';
import { BotonSiguiente } from '../../components/Welcome/BotonSiguiente';

export default function Edad({ onNext }) {
    const [selectedAge, setSelectedAge] = useState('');

    const ageRanges = [
        { value: '18-25', label: '18-25' },
        { value: '26-35', label: '26-35' },
        { value: '36-45', label: '36-45' },
        { value: '46-55', label: '46-55' },
        { value: '56+', label: '56+' }
    ];

    const handleAgeSelect = (age) => {
        setSelectedAge(age);
    };

    const handleNext = () => {
        if (selectedAge) {
            onNext({ age: selectedAge });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.titulo}>¿CUÁL ES TU EDAD?</h2>
                <p className={styles.subtitulo}>
                    Para personalizar tu plan, ¿podrías indicarnos 
                    tu edad?
                </p>

                <div className={styles.ageOptions}>
                    {ageRanges.map((range) => (
                        <button
                            key={range.value}
                            className={`${styles.ageButton} ${selectedAge === range.value ? styles.selected : ''}`}
                            onClick={() => handleAgeSelect(range.value)}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>

                <BotonSiguiente 
                    onNext={handleNext} 
                    disabled={!selectedAge}
                />
            </div>
        </div>
    );
}