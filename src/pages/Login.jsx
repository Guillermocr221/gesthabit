import styles from './Login.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export function Login() {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
       
        navigate('/home')
    }

  return (
    <div>
        <div className={styles.header}>
            <h1>GestHabit 🧘‍♂️</h1>
        </div>
            
        <h2 className={styles.subtitulo}>Inicio de sesión</h2>
        <form className={styles.formulario}  onSubmit={handleSubmit}>
            <div>
                <InputLogin type="email" id="username" name="username" placeholder="ejemplos@gmail.com"/>
            </div>

            <div>
                <InputLogin type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>
            </div>

            {/* <a className='loginLink' href="/forgot-password">Olvidaste contraseña</a> */}
            <Link className='loginLink' to="/forgot-password">Olvidaste contraseña</Link>

            <ButtonSend label="Iniciar sesión"/>
        </form>

        <div className={styles.register}>
            <p className={styles.texto}>¿No tienes una cuenta?</p>
            {/* <a className='loginLink' href="/register">Regístrate</a> */}
            <Link className='loginLink' to="/register">Regístrate</Link>
            <div className={styles.or}>Or</div> 
            <button className={styles.googleButton}>Login With Google</button>
        </div>
    </div>
    )
}