import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

import Login from './App/Vistas/Login/login'
import HomeUsuario from './App/Vistas/Home/Home'
import Header from './App/Componentes/Header/Header'
import Footer from './App/Componentes/Footer/Footer'
import HomeChofer from './App/Vistas/Home_chofer/Home_chofer'
import Perfil from './App/Vistas/Perfil/Perfil'
import ConfirmarViaje from './App/Vistas/Confirmar_viaje/Confirmar_viaje'

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
              <div style={{ margin: '0.5rem', paddingBottom: '5rem' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/Home" element={<HomeUsuario />} />
                  <Route path="/Home_Chofer" element={<HomeChofer />} />
                  <Route path="/Perfil_Usuario" element={<Perfil />} />
                  <Route
                    path="/Confirmar_viaje"
                    element={
                      <ConfirmarViaje
                        origen="City A"
                        destino="City B"
                        fecha="2025-03-14"
                        duracion="3 hours"
                        cantidadPasajeros={4}
                        chofer={{
                          nombre: 'John Doe',
                          movil: '123-456-7890',
                          dominio: 'XYZ123',
                          calificacion: 4.5,
                        }}
                      />
                    }
                  />
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
