import styles from './CardStatInicio.module.css'

export function CardStatInicio({ 
  icon, 
  title, 
  desc, 
  bgColor = "#eee", 
  progressCurrent = 0, 
  progressTotal = 1, 
  unit = "" 
}) {
  const percentage = Math.round((progressCurrent / progressTotal) * 100)
  const remaining = progressTotal - progressCurrent

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
        <div className={styles.add}>
          <p className={`font-size-16 font-weigth-bold ${styles.addCardStat}`}>+</p>
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
