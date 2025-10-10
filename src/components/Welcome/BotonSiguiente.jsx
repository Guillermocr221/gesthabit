import styles from './BotonSiguiente.module.css';

export function BotonSiguiente({ onNext, label = "Siguiente" }) {
    return (
        <button className={styles.botonSiguiente} onClick={onNext}>
            {label}
        </button>
    );
}