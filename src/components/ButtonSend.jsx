import styles from './ButtonSend.module.css'

export function ButtonSend( {label}) {
    return (
        <button className={styles.botonEnviar} type="submit">
            {label}
        </button>
    )
}