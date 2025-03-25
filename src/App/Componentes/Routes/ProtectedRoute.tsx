import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
}


const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem('usuario'); 
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    return children


};

export default ProtectedRoute;