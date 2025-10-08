import styles from './Inicio.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { CarouselInicio } from '../components/Inicio/CarouselInicio';
import { NavBarInicio } from '../components/Inicio/NavBarInicio';
import { CardStatInicio } from '../components/Inicio/CardStatInicio';

import waterIcon from '../assets/icons/water_drop.png';
import neurologyIcon from '../assets/icons/neurology.png';
import bedtimeIcon from '../assets/icons/bedtime.png';
import vitalsignsIcon from '../assets/icons/vital_signs.png';

export default function Inicio() {
    return (
        <div className={styles.contenedorInicio}>
            <header className={styles.headerInicio}>
                <img className={styles.imgUser} src="" alt="" />
                <p>Hola,<br/><span className='font-weigth-bold'>Fabrizio Rodriguez!!</span></p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </header>
            <CarouselInicio />
            <NavBarInicio />

            <CardStatInicio 
                icon={waterIcon}
                title="Hidratación"
                desc="Mantente hidratado durante el día"
                bgColor="#D4F1F4"
                progressCurrent={1.2}
                progressTotal={2}
                unit="L"
            />
            <CardStatInicio
                icon={neurologyIcon}
                title="Meditación"
                desc="Medita 10 minutos al día"
                bgColor="#E6D5B8"
                progressCurrent={6}
                progressTotal={10}
                unit="min"
            />
            <CardStatInicio
                icon={bedtimeIcon}
                title="Descanso"
                desc="Descanso reparador para tu mente"
                bgColor="#C1E1C1"
                progressCurrent={7}
                progressTotal={8}
                unit="horas"
            />
            <CardStatInicio
                icon={vitalsignsIcon}
                title="Actividad Física"
                desc="Mantén activo tu cuerpo"
                bgColor="#F4D4D4"
                progressCurrent={8500}
                progressTotal={10000}
                unit="pasos"
            />

        </div>
    )
}

