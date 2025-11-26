import { useState, useEffect } from 'react';
import styles from './EditProfilePhoto.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { auth } from '../../firebase/firebaseConfig';
import { getUserPhoto, updateUserPhoto, convertFileToBase64 } from '../../firebase/habits';
import User1 from '../../assets/image/default_user1.jpg';

export function EditProfilePhoto({ onPhotoUpdate }) {
    const [currentPhoto, setCurrentPhoto] = useState(User1);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadUserPhoto();
    }, []);

    const loadUserPhoto = async () => {
        if (auth.currentUser) {
            try {
                const result = await getUserPhoto(auth.currentUser.uid);
                if (result.success && result.photoURL) {
                    setCurrentPhoto(result.photoURL);
                } else {
                    // Si no hay foto en Firestore, usar la foto por defecto
                    setCurrentPhoto(User1);
                }
            } catch (error) {
                console.error('Error loading user photo:', error);
                setCurrentPhoto(User1);
            }
        }
    };

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.)');
            return;
        }

        // Validar tamaño (máximo 2MB para Base64)
        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen debe ser menor a 2MB para mejor rendimiento');
            return;
        }

        setUploading(true);

        try {
            // Convertir archivo a Base64
            const base64String = await convertFileToBase64(file);
            
            // Mostrar preview inmediatamente
            setCurrentPhoto(base64String);

            // Guardar en Firestore
            const result = await updateUserPhoto(auth.currentUser.uid, base64String);
            
            if (result.success) {
                console.log('✅ Foto de perfil actualizada correctamente en Firestore');
                if (onPhotoUpdate) {
                    onPhotoUpdate(base64String);
                }
            } else {
                console.error('❌ Error guardando foto:', result.error);
                alert('Error al guardar la foto. Inténtalo de nuevo.');
                // Revertir al estado anterior
                await loadUserPhoto();
            }

        } catch (error) {
            console.error('Error processing photo:', error);
            alert('Error al procesar la imagen. Inténtalo de nuevo.');
            // Revertir al estado anterior
            await loadUserPhoto();
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.photoContainer}>
            <div className={styles.photoWrapper}>
                <img 
                    src={currentPhoto} 
                    alt="Foto de perfil" 
                    className={styles.profilePhoto}
                />
                
                {uploading && (
                    <div className={styles.uploadingOverlay}>
                        <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
                    </div>
                )}

                <label htmlFor="photoInput" className={styles.photoButton}>
                    <FontAwesomeIcon icon={faCamera} />
                </label>

                <input
                    type="file"
                    id="photoInput"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={styles.hiddenInput}
                    disabled={uploading}
                />
            </div>
            
            <div className={styles.photoInfo}>
                <p className={styles.photoTitle}>Foto de Perfil</p>
                <p className={styles.photoDescription}>
                    Haz clic en el ícono de cámara para cambiar tu foto (máx. 2MB)
                </p>
            </div>
        </div>
    );
}