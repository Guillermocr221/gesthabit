import styles from './EditProfilePhoto.module.css';
import User1 from '../../assets/image/default_user1.jpg';

export function EditProfilePhoto() {
    const handleCargarArchivo = () => {
        // Crear un input file oculto y hacer click
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Archivo seleccionado:', file.name);
                // Aquí se manejaría la carga del archivo
            }
        };
        input.click();
    };

    return (
        <div className={styles.photoContainer}>
            <h3 className={styles.titulo}>Foto perfil</h3>
            
            <div className={styles.photoSection}>
                <div className={styles.fotoContainer}>
                    <img 
                        src={User1} 
                        alt="Foto de perfil" 
                        className={styles.fotoPerfil}
                    />
                </div>
                
                <button 
                    className={styles.botonCargar}
                    onClick={handleCargarArchivo}
                >
                    Cargar archivo
                </button>
            </div>
            
            <p className={styles.descripcion}>
                Cambia tu perfil de usuario
            </p>
        </div>
    );
}