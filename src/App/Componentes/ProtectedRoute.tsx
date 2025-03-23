import React from 'react';
import { UseNavigate,  } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('user'); 
    const navigate = UseNavigate()
    if (!isAuthenticated) {
        
        navigate('/login')
     
    }

    
    
};

export default ProtectedRoute;