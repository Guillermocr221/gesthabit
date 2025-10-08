import styles from './Login.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'

export function Login() {
  return (
    <div>
        <div className={styles.header}>
            <h1>GestHabit 🧘‍♂️</h1>
        </div>
            
        <h2 className={styles.subtitulo}>Inicio de sesión</h2>
        <form className={styles.formulario} action="/home" method="GET">
            <div>
                <InputLogin type="email" id="username" name="username" placeholder="ejemplos@gmail.com"/>
            </div>

            <div>
                <InputLogin type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>

            <a className='loginLink' href="/forgot-password">Olvidaste contraseña</a>

            <ButtonSend label="Iniciar sesión"/>
        </form>

        <div className={styles.register}>
            <p className={styles.texto}>¿No tienes una cuenta?</p>
            <a className='loginLink' href="/register">Regístrate</a>
            <div className={styles.or}>Or</div> 
            <button className={styles.googleButton}>Login With Google</button>
        </div>
    </div>
    )
}