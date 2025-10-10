import { useState } from 'react';
import styles from './Genero.module.css';
import { BotonSiguiente } from '../../components/Welcome/BotonSiguiente';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons'


export default function Genero({ onNext }) {
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleNext = () => {
        if (selectedGender) {
            onNext({ gender: selectedGender });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.titulo}>CUENTA SOBRE TI</h2>
                <p className={styles.subtitulo}>
                    ¿podrías indicarnos tu género para personalizar 
                    mejor tu experiencia?
                </p>

                <div className={styles.genderOptions}>
                    <button 
                        className={`${styles.genderButton} ${selectedGender === 'female' ? styles.selected : ''}`}
                        onClick={() => handleGenderSelect('female')}
                    >
                        <div className={styles.genderIcon}><FontAwesomeIcon icon={faVenus} /></div>
                    </button>
                    
                    <button 
                        className={`${styles.genderButton} ${selectedGender === 'male' ? styles.selected : ''}`}
                        onClick={() => handleGenderSelect('male')}
                    >
                        <div className={styles.genderIcon}><FontAwesomeIcon icon={faMars} /></div>
                    </button>
                </div>

                <BotonSiguiente 
                    onNext={handleNext} 
                    disabled={!selectedGender}
                />
            </div>
        </div>
    );
}