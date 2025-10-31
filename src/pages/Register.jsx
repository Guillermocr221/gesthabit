import styles from './Register.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"


export function Register() {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home')
    }

    return (
        <div className = {styles.contenedorRegistro}>
            <div>
                {/* <a href='/'><i>Volver</i></a> */}
                <Link to='/'><i>Volver</i></Link>
            </div>
            <h2 className={styles.subtitulo}>Registro</h2>
            <p>Completa tus datos</p>
            
           <form className={styles.formulario} onSubmit={handleSubmit}>
            
            <label className='font-weigth-bold' htmlFor="name">Nombres</label>
            <InputLogin type="text" id="name" name="name" placeholder="Nombre Apellido"/>

            <label className='font-weigth-bold' htmlFor="email">Correo</label>
            <InputLogin type="email" id="email" name="email" placeholder="ejemplo@unmsm.edu.pe" />

            <label className='font-weigth-bold' htmlFor="password">Contraseña</label>
            <InputLogin type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>

            <ButtonSend label="Crear Cuenta"/>

            <p className='text-center'>¿Ya tienes cuenta? <Link to="/" className='loginLink'></Link></p>
           </form>
            
        </div>
    )
}