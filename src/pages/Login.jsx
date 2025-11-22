import styles from './Login.module.css'
import { ButtonSend } from '../components/ButtonSend'
import { InputLogin } from '../components/InputLogin'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import googleLogo from '../assets/google.png'
import Logo1 from '../assets/image/logo1.png'


import { loginUser, loginWithGoogle } from "../firebase/auth";

export function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let response  = await loginUser(email, pass);
            let user = response.user;
            navigate('/home')
          } catch (err) {
            alert(err.message);
          }
    }

    const handleClickGoogle = async () => {
        try {
            let response =  await loginWithGoogle();
            let user = response.user;
            navigate('/home')
            } catch (err) {
                alert(err.message);
            }
    }


  return (
    <div>
        <div className={styles.header}>
            <h1>GestHabit </h1>
            <img src={Logo1} className={styles.logo} />
        </div>
            
        <h2 className={styles.subtitulo}>Inicio de sesión</h2>
        <form className={styles.formulario}  onSubmit={handleSubmit}>
            <div>
                <InputLogin type="email" id="username" name="username" placeholder="ejemplos@gmail.com"  onChange={e => setEmail(e.target.value)}/>
            </div>

            <div>
                <InputLogin type="password" id="password" name="password" placeholder="Ingrese su contraseña" onChange={e => setPass(e.target.value)}/>
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
            <button className={styles.googleButton} onClick={handleClickGoogle} ><img src={googleLogo} className={styles.googleLogo} />Continue with Google</button>
        </div>
    </div>
    )
}