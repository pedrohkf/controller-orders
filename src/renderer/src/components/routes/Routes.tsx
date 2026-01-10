import Register from '@renderer/pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={Register} path='/' />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
