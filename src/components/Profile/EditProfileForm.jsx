import { useState } from 'react';
import styles from './EditProfileForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function EditProfileForm({ formData, onInputChange, onActualizar, isUpdating }) {
    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'nombres':
                if (!value.trim()) {
                    newErrors.nombres = 'El nombre es obligatorio';
                } else if (value.trim().length < 2) {
                    newErrors.nombres = 'El nombre debe tener al menos 2 caracteres';
                } else {
                    delete newErrors.nombres;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    newErrors.email = 'El email es obligatorio';
                } else if (!emailRegex.test(value)) {
                    newErrors.email = 'Por favor ingresa un email válido';
                } else {
                    delete newErrors.email;
                }
                break;

            case 'telefono':
                if (value && !/^\d{9,15}$/.test(value.replace(/\s/g, ''))) {
                    newErrors.telefono = 'El teléfono debe tener entre 9 y 15 dígitos';
                } else {
                    delete newErrors.telefono;
                }
                break;

            case 'edad':
                if (value && (isNaN(value) || value < 1 || value > 120)) {
                    newErrors.edad = 'La edad debe estar entre 1 y 120 años';
                } else {
                    delete newErrors.edad;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleInputChange = (field, value) => {
        onInputChange(field, value);
        validateField(field, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        const fieldsToValidate = ['nombres', 'email', 'telefono', 'edad'];
        let hasErrors = false;

        fieldsToValidate.forEach(field => {
            validateField(field, formData[field]);
            if (errors[field]) hasErrors = true;
        });

        if (!hasErrors && Object.keys(errors).length === 0) {
            onActualizar();
        }
    };

    return (
        <div className={styles.formContainer}>
            <h3 className={styles.titulo}>Editar Perfil</h3>
            
            <form className={styles.formulario} onSubmit={handleSubmit}>
                {/* Nombres */}
                <div className={styles.inputGroup}>
                    <label htmlFor="nombres">Nombres *</label>
                    <input
                        type="text"
                        id="nombres"
                        value={formData.nombres}
                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                        className={errors.nombres ? styles.inputError : ''}
                        placeholder="Ingresa tus nombres"
                        disabled={isUpdating}
                    />
                    {errors.nombres && <span className={styles.errorText}>{errors.nombres}</span>}
                </div>

                {/* Apellidos */}
                <div className={styles.inputGroup}>
                    <label htmlFor="apellidos">Apellidos</label>
                    <input
                        type="text"
                        id="apellidos"
                        value={formData.apellidos}
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                        placeholder="Ingresa tus apellidos"
                        disabled={isUpdating}
                    />
                </div>

                {/* Email */}
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? styles.inputError : ''}
                        placeholder="correo@ejemplo.com"
                        disabled={isUpdating}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                {/* Teléfono */}
                <div className={styles.inputGroup}>
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                        className={errors.telefono ? styles.inputError : ''}
                        placeholder="123456789"
                        disabled={isUpdating}
                    />
                    {errors.telefono && <span className={styles.errorText}>{errors.telefono}</span>}
                </div>

                {/* Género */}
                <div className={styles.inputGroup}>
                    <label htmlFor="genero">Género</label>
                    <select
                        id="genero"
                        value={formData.genero}
                        onChange={(e) => handleInputChange('genero', e.target.value)}
                        disabled={isUpdating}
                    >
                        <option value="">Seleccionar género</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Edad */}
                <div className={styles.inputGroup}>
                    <label htmlFor="edad">Edad</label>
                    <input
                        type="number"
                        id="edad"
                        value={formData.edad}
                        onChange={(e) => handleInputChange('edad', e.target.value)}
                        className={errors.edad ? styles.inputError : ''}
                        placeholder="25"
                        min="1"
                        max="120"
                        disabled={isUpdating}
                    />
                    {errors.edad && <span className={styles.errorText}>{errors.edad}</span>}
                </div>

                {/* Botón actualizar */}
                <button 
                    type="submit" 
                    className={styles.botonActualizar}
                    disabled={isUpdating || Object.keys(errors).length > 0}
                >
                    {isUpdating ? (
                        <>
                            <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
                            Actualizando...
                        </>
                    ) : (
                        'Actualizar Perfil'
                    )}
                </button>
            </form>
        </div>
    );
}