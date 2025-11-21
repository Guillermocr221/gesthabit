import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { ButtonSend } from '../components/ButtonSend';
import { InputLogin } from '../components/InputLogin';
import { registerUser } from '../firebase/auth';
import { createUser } from '../firebase/habits';

export function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Crear usuario en Firebase Authentication
            const response = await registerUser(formData.email, formData.password);
            const user = response.user;

            // Extraer nombres y apellidos del campo name
            const fullName = formData.name.trim();
            const nameParts = fullName.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            // Crear documento del usuario en Firestore
            const userData = {
                uid: user.uid,
                email: formData.email,
                nombres: firstName,
                apellidos: lastName,
                nombreCompleto: fullName,
                telefono: '',
                genero: '',
                edad: '',
                dificultades: [],
                metas: [],
                photoURL: '',
                isProfileComplete: false
            };

            const createUserResult = await createUser(user.uid, userData);

            if (createUserResult.success) {
                alert(`¡Bienvenido ${fullName}! Tu cuenta ha sido creada exitosamente.`);
                navigate('/welcome');
            } else {
                console.error('Error creating user document:', createUserResult.error);
                alert('Usuario creado, pero hubo un error guardando la información adicional.');
                navigate('/welcome');
            }

        } catch (error) {
            console.error('Error en registro:', error);
            alert('Error al crear la cuenta: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.contenedorRegistro}>
            <div>
                <a href='/'><i>Volver</i></a>
            </div>
            <h2 className={styles.subtitulo}>Registro</h2>
            <p>Completa tus datos</p>
            
            <form className={styles.formulario} onSubmit={handleSubmit}>
                <label className='font-weigth-bold' htmlFor="name">Nombres</label>
                <InputLogin 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Nombre Apellido"
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />

                <label className='font-weigth-bold' htmlFor="email">Correo</label>
                <InputLogin 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="ejemplo@unmsm.edu.pe"
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />

                <label className='font-weigth-bold' htmlFor="password">Contraseña</label>
                <InputLogin 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />

                <ButtonSend label={isLoading ? "Creando cuenta..." : "Crear Cuenta"} />

                <p className='text-center'>
                    ¿Ya tienes cuenta? <a className='loginLink' href='/'>Inicia sesión</a>
                </p>
            </form>
        </div>
    );
}