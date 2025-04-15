import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Login from './App/Vistas/Login/login'
import HomeUsuario from './App/Vistas/Home/Home'
import Header from './App/Componentes/Header/Header'
import Footer from './App/Componentes/Footer/Footer'
import Perfil from './App/Vistas/Perfil/Perfil'
import ConfirmarViaje from './App/Vistas/Confirmar_viaje/Confirmar_viaje'
import ProtectedRoute from './App/Componentes/Routes/ProtectedRoute'


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
                  <Route path="/Home" element={<ProtectedRoute> <HomeUsuario /> </ProtectedRoute>} />
                  <Route path="/Perfil_Usuario" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                  <Route path="/Confirmar_viaje" element={<ProtectedRoute><ConfirmarViaje /></ProtectedRoute>} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export const ReadAppRouter = () => (
  <Router>
    <ReadAppRoutes />
  </Router>
);
