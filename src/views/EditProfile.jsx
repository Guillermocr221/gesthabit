import { useState } from 'react';
import styles from './EditProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { EditProfilePhoto } from '../components/Profile/EditProfilePhoto';
import { EditProfileForm } from '../components/Profile/EditProfileForm';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        contraseña: '',
        correo: 'diego.fernando.ramire@gmail.com',
        telefono: ''
    });

    const handleVolver = () => {
        navigate('/home');
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleActualizar = () => {
        console.log("Actualizar perfil:", formData);
        navigate('/home');
    };

    return (
        <div className={styles.contenedorEditProfile}>
            {/* Header con botón de volver */}
            <div className={styles.headerEditProfile}>
                <button className={styles.botonVolver} onClick={handleVolver}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>

            {/* Foto de perfil */}
            <EditProfilePhoto />

            {/* Formulario de edición */}
            <EditProfileForm 
                formData={formData}
                onInputChange={handleInputChange}
                onActualizar={handleActualizar}
            />
        </div>
    );
}