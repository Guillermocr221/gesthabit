import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Bienvenida from "../views/Welcome/Bienvenida"
import Genero from "../views/Welcome/Genero"
import Edad from "../views/Welcome/Edad"
import Dificultades from "../views/Welcome/Dificultades"
import Metas from "../views/Welcome/Metas"

export function Welcome() {
    const [currentView, setCurrentView] = useState("bienvenida")
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    
    const handleNext = (data) => {
        // Guardar datos del usuario
        setUserData(prev => ({ ...prev, ...data }))
        
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
                // Al completar todas las vistas, ir a home
                console.log('Datos completos del usuario:', { ...userData, ...data })
                navigate('/home')
                break
            default:
                break
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