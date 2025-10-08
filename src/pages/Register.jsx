
import styles from './Register.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'

export function Register() {
    return (
        <div className = {styles.contenedorRegistro}>
            <div>
                <a href='/'><i>Volver</i></a>
            </div>
            <h2 className={styles.subtitulo}>Registro</h2>
            <p>Completa tus datos</p>
            
           <form className={styles.formulario} action="">
            
            <label className='font-weigth-bold' htmlFor="name">Nombres</label>
            <InputLogin type="text" id="name" name="name" placeholder="Nombre Apellido"/>

            <label className='font-weigth-bold' htmlFor="email">Correo</label>
            <InputLogin type="email" id="email" name="email" placeholder="ejemplo@unmsm.edu.pe" />

            <label className='font-weigth-bold' htmlFor="password">Contraseña</label>
            <InputLogin type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <ButtonSend label="Crear Cuenta"/>

            <p className='text-center'>¿Ya tienes cuenta? <a className='loginLink' href='/'>Inicia sesión</a></p>
           </form>
            
        </div>
    )
}