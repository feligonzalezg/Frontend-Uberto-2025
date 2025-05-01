import React from 'react';
import usuarioService from '../../Services/LoginService';
import HomeChofer from './HomeChofer'
import HomeViajero from './HomeViajero'


const HomeUsuario: React.FC = () => {
  const userObject = usuarioService.getUsuarioLogeado()
  const esChofer = usuarioService.getRolUsuario()
  
  return esChofer ? <HomeChofer user={userObject} /> : <HomeViajero user={userObject} />

};

export default HomeUsuario;
