import styles from "./BottomNavbar.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faChartBar, faTrophy, faCircleCheck } from "@fortawesome/free-solid-svg-icons"


export default function BottomNavbar({ onChange }) {
  return (
    <nav className={styles.navbar}>
      <button onClick={() => onChange("inicio")}><FontAwesomeIcon icon={faHouse} /></button>
      <button onClick={() => onChange("activity")}><FontAwesomeIcon icon={faCircleCheck} /></button>
      <button onClick={() => onChange("stats")}><FontAwesomeIcon icon={faChartBar} /></button>
      <button onClick={() => onChange("achievements")}><FontAwesomeIcon icon={faTrophy} /></button>
      <button onClick={() => onChange("profile")}><FontAwesomeIcon icon={faUser} /></button>
    </nav>
  )
}