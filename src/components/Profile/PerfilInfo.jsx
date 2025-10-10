import styles from './PerfilInfo.module.css';
import User1 from '../../assets/image/default_user1.jpg';

export function PerfilInfo({ usuario }) {
    return (
        <div className={styles.perfilContainer}>
            {/* Foto de perfil */}
            <div className={styles.fotoContainer}>
                <img 
                    src={User1} 
                    alt="Foto de perfil" 
                    className={styles.fotoPerfil}
                />
            </div>

            {/* Información del usuario */}
            <div className={styles.infoContainer}>
                <div className={styles.campoInfo}>
                    <label className={styles.labelCampo}>Nombre</label>
                    <div className={styles.valorCampo}>{usuario.nombre}</div>
                </div>

                <div className={styles.campoInfo}>
                    <label className={styles.labelCampo}>Correo</label>
                    <div className={styles.valorCampo}>{usuario.correo}</div>
                </div>

                <div className={styles.campoInfo}>
                    <label className={styles.labelCampo}>Teléfono</label>
                    <div className={styles.valorCampo}>{usuario.telefono}</div>
                </div>

                <div className={styles.campoInfo}>
                    <label className={styles.labelCampo}>Género</label>
                    <div className={styles.valorCampo}>{usuario.genero}</div>
                </div>
            </div>
        </div>
    );
}