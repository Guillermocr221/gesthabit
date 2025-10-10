import styles from './PerfilDificultades.module.css';

export function PerfilDificultades({ dificultades }) {
    return (
        <div className={styles.dificultadesContainer}>
            <h3 className={styles.titulo}>Principales dificultades</h3>
            <ul className={styles.listaDificultades}>
                {dificultades.map((dificultad, index) => (
                    <li key={index} className={styles.itemDificultad}>
                        {dificultad}
                    </li>
                ))}
            </ul>
        </div>
    );
}