import styles from './PerfilMetas.module.css';

export function PerfilMetas({ metas }) {
    return (
        <div className={styles.metasContainer}>
            <h3 className={styles.titulo}>Metas y objetivos</h3>
            <ul className={styles.listaMetas}>
                {metas.map((meta, index) => (
                    <li key={index} className={styles.itemMeta}>
                        {meta}
                    </li>
                ))}
            </ul>
        </div>
    );
}