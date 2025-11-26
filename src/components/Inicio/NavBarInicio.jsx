import styles from './NavBarInicio.module.css'

export function NavBarInicio({ categoriaActiva, onCategoriaChange }) {
  const categorias = [
    { id: 'ejercicios', label: 'Ejercicios' },
    { id: 'relajacion', label: 'Relajacion' },
    { id: 'nutricion', label: 'Nutricion' },
    { id: 'metas', label: 'Metas' }
  ];

  return (
    <div className={styles.navbarInicio}>   
        {categorias.map((categoria) => (
          <div 
            key={categoria.id}
            className={`${styles.botonNav} ${categoriaActiva === categoria.id ? styles.botonNavActivo : ''}`}
            onClick={() => onCategoriaChange(categoria.id)}
          >
            {categoria.label}
          </div>
        ))}
    </div>
  )
}

