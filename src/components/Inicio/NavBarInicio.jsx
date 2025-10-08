import styles from './NavBarInicio.module.css'

export function NavBarInicio() {
  return (
    <div className={styles.navbarInicio}>   
        <div className={styles.botonNav}>
            Ejercicios
        </div>
        <div className={styles.botonNav}>
            Relajacion
        </div>
        <div className={styles.botonNav}>
            Nutricion
        </div>
        <div className={styles.botonNav}>
            Metas
        </div>
    </div>
    )
}

