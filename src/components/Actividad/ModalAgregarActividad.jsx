import { useState } from 'react';
import styles from './ModalAgregarActividad.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function ModalAgregarActividad({ fechaSeleccionada, onClose, onAgregar }) {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        hora: '',
        prioridad: 'media',
        categoria: 'personal'
    });

    const [loading, setLoading] = useState(false);

    const categorias = [
        { value: 'ejercicio', label: 'Ejercicio' },
        { value: 'trabajo', label: 'Trabajo' },
        { value: 'personal', label: 'Personal' },
        { value: 'salud', label: 'Salud' },
        { value: 'estudio', label: 'Estudio' },
        { value: 'social', label: 'Social' }
    ];

    const prioridades = [
        { value: 'baja', label: 'Baja', color: '#2ed573' },
        { value: 'media', label: 'Media', color: '#ffa502' },
        { value: 'alta', label: 'Alta', color: '#ff4757' }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.titulo.trim()) {
            alert('El título es obligatorio');
            return;
        }

        setLoading(true);
        await onAgregar(formData);
        setLoading(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>Agregar Actividad</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className={styles.fechaInfo}>
                    <p>Para el día: <strong>{formatDate(fechaSeleccionada)}</strong></p>
                </div>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="titulo">Título *</label>
                        <input
                            type="text"
                            id="titulo"
                            value={formData.titulo}
                            onChange={(e) => handleInputChange('titulo', e.target.value)}
                            placeholder="Ej: Hacer ejercicio, Reunión importante..."
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            value={formData.descripcion}
                            onChange={(e) => handleInputChange('descripcion', e.target.value)}
                            placeholder="Detalles adicionales (opcional)"
                            rows="3"
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="hora">Hora</label>
                            <input
                                type="time"
                                id="hora"
                                value={formData.hora}
                                onChange={(e) => handleInputChange('hora', e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                id="categoria"
                                value={formData.categoria}
                                onChange={(e) => handleInputChange('categoria', e.target.value)}
                            >
                                {categorias.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Prioridad</label>
                        <div className={styles.prioridadButtons}>
                            {prioridades.map(prioridad => (
                                <button
                                    key={prioridad.value}
                                    type="button"
                                    className={`${styles.prioridadButton} ${
                                        formData.prioridad === prioridad.value ? styles.active : ''
                                    }`}
                                    style={{
                                        backgroundColor: formData.prioridad === prioridad.value 
                                            ? prioridad.color 
                                            : 'transparent',
                                        borderColor: prioridad.color,
                                        color: formData.prioridad === prioridad.value 
                                            ? 'white' 
                                            : prioridad.color
                                    }}
                                    onClick={() => handleInputChange('prioridad', prioridad.value)}
                                >
                                    {prioridad.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Agregando...' : 'Agregar Actividad'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}