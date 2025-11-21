import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/firebaseConfig"
import { updateUser } from "../firebase/habits"

import Bienvenida from "../views/Welcome/Bienvenida"
import Genero from "../views/Welcome/Genero"
import Edad from "../views/Welcome/Edad"
import Dificultades from "../views/Welcome/Dificultades"
import Metas from "../views/Welcome/Metas"

export function Welcome() {
    const [currentView, setCurrentView] = useState("bienvenida")
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    
    const handleNext = async (data) => {
        // Guardar datos del usuario
        const newUserData = { ...userData, ...data }
        setUserData(newUserData)
        
        // Navegar a la siguiente vista
        switch (currentView) {
            case 'bienvenida':
                setCurrentView('genero')
                break
            case 'genero':
                setCurrentView('edad')
                break
            case 'edad':
                setCurrentView('dificultades')
                break
            case 'dificultades':
                setCurrentView('metas')
                break
            case 'metas':
                // Al completar todas las vistas, guardar en Firestore e ir a home
                await saveCompleteUserData(newUserData)
                navigate('/home')
                break
            default:
                break
        }
    }

    const saveCompleteUserData = async (completeData) => {
        try {
            const currentUser = auth.currentUser
            if (currentUser) {
                const updateData = {
                    genero: completeData.gender === 'male' ? 'Masculino' : 'Femenino',
                    edad: completeData.age,
                    dificultades: completeData.difficulties || [],
                    metas: completeData.goals || [],
                    isProfileComplete: true
                }

                const result = await updateUser(currentUser.uid, updateData)
                
                if (result.success) {
                    console.log('Datos del usuario actualizados correctamente')
                } else {
                    console.error('Error actualizando datos del usuario:', result.error)
                }
            }
        } catch (error) {
            console.error('Error guardando datos completos:', error)
        }
    }
    
    return (
        <div>
            {currentView === 'bienvenida' && <Bienvenida onNext={handleNext} />}
            {currentView === 'genero' && <Genero onNext={handleNext} />}
            {currentView === 'edad' && <Edad onNext={handleNext} />}
            {currentView === 'dificultades' && <Dificultades onNext={handleNext} />}
            {currentView === 'metas' && <Metas onNext={handleNext} />}
        </div>
    )
}