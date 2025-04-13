import { Navigate } from 'react-router-dom';
import usuarioService from '../../Services/LoginService';

type ProtectedRouteProps = {
  children: React.ReactNode;
}


const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuthenticated =usuarioService.getUsuarioLogeado() 
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    return children


};

export default ProtectedRoute;