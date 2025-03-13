import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Login from './App/Vistas/Login/Home_login'
import HomeUsuario from './App/Vistas/Home_Usuario/Home_usuario'
import Header from './App/Componentes/Header/Header'
import Footer from './App/Componentes/Footer/Footer'
import HomeChofer from './App/Vistas/Home_chofer/Home_chofer'

export const ReadAppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <div style={{ paddingBottom: '5rem' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/Home" element={<HomeUsuario />} />
                  <Route path="/Home_Chofer" element={<HomeChofer />} />
                </Routes>
              </div>

              <Footer />
            </>
          }
        />
      </Routes>
    </>
  )
}

export const ReadAppRouter = () => (
  <Router>
    <ReadAppRoutes />
  </Router>
)
