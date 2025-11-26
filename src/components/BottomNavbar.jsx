import styles from "./BottomNavbar.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faChartBar, faTrophy, faCircleCheck } from "@fortawesome/free-solid-svg-icons"


export default function BottomNavbar({ onChange, currentView }) {
  const navItems = [
    { id: "inicio", icon: faHouse, label: "Inicio" },
    { id: "activity", icon: faCircleCheck, label: "Actividad" },
    { id: "stats", icon: faChartBar, label: "Estadísticas" },
    { id: "achievements", icon: faTrophy, label: "Logros" },
    { id: "profile", icon: faUser, label: "Perfil" }
  ];

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`${styles.navButton} ${currentView === item.id ? styles.active : ''}`}
        >
          <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}