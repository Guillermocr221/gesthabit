
import styles from './ForgotPassword.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'
import { Link } from 'react-router-dom'

export function ForgotPassword() {

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home')
    }
    
    return (
        <div className={styles.contenedorForgotPassword}>
            <div>
                {/* <a href='/'><i>Volver</i></a> */}
                <Link to='/'><i>Volver</i></Link>
            </div>
            <div className={styles.header}>
                <h1>GestHabit 🧘‍♂️</h1>
            </div>

            <p className='font-weigth-bold'>¿Olvidaste tu contraseña?</p>
            <p className={styles.maxw}>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña</p>

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <label className='font-weigth-bold' htmlFor="email">Correo</label>
                <div>
                    <InputLogin type="email" id="email" name="email" placeholder="ejemplo@unmsm.edu.pe" width100={true}/>
                </div>
                <label className='font-size-12' htmlFor="email">Por favor ingrese su correo registrado.</label>

                <ButtonSend label="Enviar" />
            </form>
                

        </div>
    )
}