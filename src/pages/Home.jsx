
import { useState } from "react"

import BottomNavbar from "../components/BottomNavbar"

import Inicio from "../views/Inicio"
// import Activity from "../views/Activity"
// import Stats from "../views/Stats"
// import Achievements from "../views/Achievements"
// import Profile from "../views/Profile"

export function Home() {
    const [currentView, setCurrentView] = useState("inicio")
    
    return (
        <div>
            {currentView === 'inicio' && <Inicio />}
            {/* {currentView === 'activity' && <Activity />}
            {currentView === 'stats' && <Stats />}
            {currentView === 'achievements' && <Achievements />}
            {currentView === 'profile' && <Profile />} */}

            <BottomNavbar onChange={setCurrentView} />
        </div>
    )
}