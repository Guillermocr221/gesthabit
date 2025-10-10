import { useState } from 'react';
import styles from './EditProfileForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function EditProfileForm({ formData, onInputChange, onActualizar }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.formContainer}>
            {/* Campo Nombres */}
            <div className={styles.campoForm}>
                <label className={styles.labelCampo}>Nombres</label>
                <input
                    type="text"
                    placeholder="Cambiar nombres"
                    value={formData.nombres}
                    onChange={(e) => onInputChange('nombres', e.target.value)}
                    className={styles.inputCampo}
                />
            </div>

            {/* Campo Apellidos */}
            <div className={styles.campoForm}>
                <label className={styles.labelCampo}>Apellidos</label>
                <input
                    type="text"
                    placeholder="Cambiar apellidos"
                    value={formData.apellidos}
                    onChange={(e) => onInputChange('apellidos', e.target.value)}
                    className={styles.inputCampo}
                />
            </div>

            {/* Campo Contraseña */}
            <div className={styles.campoForm}>
                <label className={styles.labelCampo}>Contraseña</label>
                <div className={styles.passwordContainer}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nueva contraseña"
                        value={formData.contraseña}
                        onChange={(e) => onInputChange('contraseña', e.target.value)}
                        className={styles.inputCampo}
                    />
                    <button
                        type="button"
                        className={styles.botonOjo}
                        onClick={togglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
            </div>

            {/* Campo Correo (solo lectura) */}
            <div className={styles.campoForm}>
                <label className={styles.labelCampo}>Correo</label>
                <div className={styles.correoReadonly}>
                    {formData.correo}
                </div>
            </div>

            {/* Campo Teléfono */}
            <div className={styles.campoForm}>
                <label className={styles.labelCampo}>Teléfono</label>
                <input
                    type="tel"
                    placeholder="Actualizar teléfono"
                    value={formData.telefono}
                    onChange={(e) => onInputChange('telefono', e.target.value)}
                    className={styles.inputCampo}
                />
            </div>

            {/* Botón Actualizar */}
            <button 
                className={styles.botonActualizar}
                onClick={onActualizar}
            >
                Actualizar
            </button>
        </div>
    );
}