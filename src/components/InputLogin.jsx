
import styles from './InputLogin.module.css'

export function InputLogin( {type, id, name, placeholder, width100 = false} ) {
    let inputClass = '';
    if (width100 ) {
        inputClass = styles.width100;
    }
    return (
        <input className={`${styles.input} ${inputClass}`} type={type} id={id} name={name} required placeholder={placeholder} />
    )
}