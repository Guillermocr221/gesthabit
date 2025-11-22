import { useState, useEffect } from 'react';
import styles from './PerfilInfo.module.css';
import { auth } from '../../firebase/firebaseConfig';
import { getUserPhoto } from '../../firebase/habits';
import User1 from '../../assets/image/default_user1.jpg';

export function PerfilInfo({ usuario }) {
    const [photoURL, setPhotoURL] = useState(User1);
    const [photoLoading, setPhotoLoading] = useState(true);

    useEffect(() => {
        loadUserPhoto();
    }, []);

    const loadUserPhoto = async () => {
        if (auth.currentUser) {
            setPhotoLoading(true);
            try {
                const result = await getUserPhoto(auth.currentUser.uid);
                if (result.success && result.photoURL) {
                    setPhotoURL(result.photoURL);
                } else {
                    setPhotoURL(User1);
                }
            } catch (error) {
                console.error('Error loading user photo:', error);
                setPhotoURL(User1);
            } finally {
                setPhotoLoading(false);
            }
        } else {
            setPhotoURL(User1);
            setPhotoLoading(false);
        }
    };

    return (
        <div className={styles.perfilContainer}>
            <div className={styles.fotoContainer}>
                {photoLoading ? (
                    <div className={styles.photoLoading}>
                        <div className={styles.photoSkeleton}></div>
                    </div>
                ) : (
                    <img 
                        src={photoURL} 
                        alt="Foto de perfil" 
                        className={styles.fotoPerfil}
                    />
                )}
            </div>

            <div className={styles.infoContainer}>
                <div className={styles.campoInfo}>
                    <span className={styles.labelCampo}>Nombre completo</span>
                    <span className={styles.valorCampo}>{usuario.nombre || 'No especificado'}</span>
                </div>

                <div className={styles.campoInfo}>
                    <span className={styles.labelCampo}>Correo electrónico</span>
                    <span className={styles.valorCampo}>{usuario.correo || 'No especificado'}</span>
                </div>

                <div className={styles.campoInfo}>
                    <span className={styles.labelCampo}>Teléfono</span>
                    <span className={styles.valorCampo}>{usuario.telefono || 'No especificado'}</span>
                </div>

                <div className={styles.campoInfo}>
                    <span className={styles.labelCampo}>Género</span>
                    <span className={styles.valorCampo}>{usuario.genero || 'No especificado'}</span>
                </div>

                <div className={styles.campoInfo}>
                    <span className={styles.labelCampo}>Edad</span>
                    <span className={styles.valorCampo}>{usuario.edad || 'No especificada'}</span>
                </div>
            </div>
        </div>
    );
}