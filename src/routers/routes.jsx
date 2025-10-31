import {HashRouter  as Router, Routes, Route} from 'react-router-dom'
import {Login} from '../pages/Login'
import {Register} from '../pages/Register'
import {ForgotPassword} from '../pages/ForgotPassword'
import {Home} from '../pages/Home'
import {Welcome} from '../pages/Welcome'
import EditProfile from '../views/EditProfile'

export default function MyRoutes() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />    
                <Route path="/register" element={<Register/>} />  
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path='/home' element={<Home />} />
                <Route path='/welcome' element={<Welcome />} />
                <Route path='/edit-profile' element={<EditProfile />} />
            </Routes>
        </Router>
    )
}