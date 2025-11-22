import { useState, useEffect } from 'react';
import styles from './EditProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { EditProfilePhoto } from '../components/Profile/EditProfilePhoto';
import { EditProfileForm } from '../components/Profile/EditProfileForm';
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase/firebaseConfig';
import { getUser, updateUser } from '../firebase/habits';

export default function EditProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        genero: '',
        edad: ''
    });

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
                const userData = result.data;
                setFormData({
                    nombres: userData.nombres || '',
                    apellidos: userData.apellidos || '',
                    email: userData.email || auth.currentUser.email || '',
                    telefono: userData.telefono || '',
                    genero: userData.genero || '',
                    edad: userData.edad?.toString() || ''
                });
            } else {
                console.error('Error loading user data:', result.error);
                // Usar datos básicos de Firebase Auth
                setFormData({
                    nombres: auth.currentUser.displayName?.split(' ')[0] || '',
                    apellidos: auth.currentUser.displayName?.split(' ').slice(1).join(' ') || '',
                    email: auth.currentUser.email || '',
                    telefono: '',
                    genero: '',
                    edad: ''
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVolver = () => {
        navigate('/home');
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleActualizar = async () => {
        if (!auth.currentUser) {
            alert('No hay usuario autenticado');
            return;
        }

        // Validaciones básicas
        if (!formData.nombres.trim()) {
            alert('El nombre es obligatorio');
            return;
        }

        if (!formData.email.trim()) {
            alert('El email es obligatorio');
            return;
        }

        // Validar email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor ingresa un email válido');
            return;
        }

        // Validar edad si se proporciona
        if (formData.edad && (isNaN(formData.edad) || formData.edad < 1 || formData.edad > 120)) {
            alert('Por favor ingresa una edad válida (1-120 años)');
            return;
        }

        setUpdating(true);
        try {
            // Preparar datos para actualizar
            const updateData = {
                nombres: formData.nombres.trim(),
                apellidos: formData.apellidos.trim(),
                email: formData.email.trim(),
                telefono: formData.telefono.trim(),
                genero: formData.genero,
                edad: formData.edad ? parseInt(formData.edad) : null,
                nombreCompleto: `${formData.nombres.trim()} ${formData.apellidos.trim()}`.trim()
            };

            const result = await updateUser(auth.currentUser.uid, updateData);
            
            if (result.success) {
                alert('Perfil actualizado correctamente');
                navigate('/home');
            } else {
                console.error('Error updating user:', result.error);
                alert('Error al actualizar el perfil: ' + result.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error inesperado al actualizar el perfil');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.contenedorEditProfile}>
                <div className={styles.headerEditProfile}>
                    <button className={styles.botonVolver} onClick={handleVolver}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </div>
                <div className={styles.loading}>Cargando datos del perfil...</div>
            </div>
        );
    }

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
                isUpdating={updating}
            />
        </div>
    );
}