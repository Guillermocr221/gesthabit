import { useState } from 'react';
import styles from './CardStatInicio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebase/firebaseConfig';
import { updateProgresoDaily } from '../../firebase/habits';

export function CardStatInicio({ 
  icon, 
  title, 
  desc, 
  bgColor = "#eee", 
  progressCurrent = 0, 
  progressTotal = 1, 
  unit = "",
  activityId,
  onUpdate
}) {
  const [isLoading, setIsLoading] = useState(false);
  const percentage = Math.round((progressCurrent / progressTotal) * 100);
  const remaining = progressTotal - progressCurrent;

  const handleAddProgress = async () => {
    if (auth.currentUser && activityId && !isLoading) {
      setIsLoading(true);
      
      try {
        const today = new Date().toISOString().split('T')[0];
        const increment = getIncrement(activityId);
        const newCurrent = Math.min(progressCurrent + increment, progressTotal);
        
        // Actualizar en Firestore
        const updateData = {
          [activityId]: {
            current: newCurrent,
            total: progressTotal
          }
        };
        
        const result = await updateProgresoDaily(auth.currentUser.uid, today, updateData);
        
        if (result.success && onUpdate) {
          onUpdate(); // Refrescar datos en el componente padre
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getIncrement = (activityId) => {
    const increments = {
      // Nutrición
      hidratacion: 0.25, // 250ml
      descanso: 1,       // 1 hora
      
      // Relajación
      meditacion: 5,     // 5 minutos
      respiracion: 1,    // 1 sesión
      
      // Ejercicios
      cardio: 5,         // 5 minutos
      fuerza: 1,         // 1 serie
      
      // Metas
      actividad_fisica: 1000, // 1000 pasos
    };
    return increments[activityId] || 1;
  };

  return (
    <div className={styles.card}>
      {/*Header de card (imagen + descripcion + accion)  */}
      <div className={styles.header}>
        <div className={styles.icono}>
          <img src={icon} alt={title} />
        </div>
        <div className={styles.informacion}>
          <p className={`font-size-16 font-weigth-bold ${styles.titleCardStat}`}>{title}</p>
          <p className={`font-size-14 ${styles.statCardStat}`}>{desc}</p>
        </div>
        <div className={`${styles.add} ${isLoading ? styles.loading : ''}`} onClick={handleAddProgress}>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
          ) : (
            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
          )}
        </div>
      </div>

      {/*Body de card (barra de progreso + informacion)  */}
      <div className={styles.body}>
        <div className={styles.progressInfo}>
          <p>Progreso</p>
          <p className='font-weigth-bold'>{progressCurrent}/{progressTotal} {unit}</p>
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progress} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className={styles.progressFooter}>
          <p>{percentage}% completado</p>
          <p>{remaining} restantes</p>
        </div>
      </div>
    </div>
  )
}
