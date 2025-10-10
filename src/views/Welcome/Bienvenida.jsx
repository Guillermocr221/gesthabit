import styles from './Bienvenida.module.css';
import { BotonSiguiente } from '../../components/Welcome/BotonSiguiente';
import Logo1 from '../../assets/image/logo1.png'

export default function Bienvenida({ onNext }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <h1 className={styles.logo}>GESTHABIT</h1>
                    <div className={styles.logoIcon}>
                        <img src={Logo1}/>
                    </div>
                </div>
                
                <p className={styles.tagline}>
                    SÉ LA MEJOR VERSIÓN DE TI MISMO
                </p>
                
                <BotonSiguiente onNext={onNext} />
            </div>
        </div>
    );
}