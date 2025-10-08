import styles from './CarouselInicio.module.css'

function cardCarousel() {
  return (
    <div className={styles.cardCarousel}>
        <div className={styles.contenido}>
            <h4>Refresa tu cuerpo corriendo!!</h4>
            <div className={styles.contenedorImagenesCirculo}>
                <div className={styles.imagenCirculo}></div>
                <div className={styles.imagenCirculo}></div>
                <div className={styles.imagenCirculo}></div>
                <div className={styles.imagenCirculo}></div>
            </div>
            <div className={`${styles.botonEmpiezaHoy} font-size-14`}>
                Empieza hoy!!
            </div>
        </div>
        <div className={styles.contenedorImagen}>
            <img src="" alt="" />
        </div>
    </div>
  )
}

function buttonsCarousel() {
    return (
        <div className={styles.buttonsCarousel}>
            <div className={`${styles.botonCarousel} ${styles.botonCarouselActivo} `}></div>
            <div className={styles.botonCarousel}></div>
            <div className={styles.botonCarousel}></div>
            <div className={styles.botonCarousel}></div>
            <div className={styles.botonCarousel}></div>
            <div className={styles.botonCarousel}></div>
        
        </div>    
        )
}

export function CarouselInicio() {
    return (
        <div>
            {cardCarousel()}
            {buttonsCarousel()}
        </div>
    )
}

