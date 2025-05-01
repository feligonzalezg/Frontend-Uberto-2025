import React from 'react';
import usuarioService from '../../Services/LoginService';
import HomeChofer from './HomeChofer'
import HomeViajero from './HomeViajero'


const HomeUsuario: React.FC = () => {
  const token = usuarioService.getUsuarioLogeado()
  const esChofer = usuarioService.getRolUsuario()
  
  return esChofer ? <HomeChofer token={token} /> : <HomeViajero token={token} />

};

export default HomeUsuario;
