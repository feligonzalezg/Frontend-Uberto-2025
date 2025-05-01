import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  id: string;
  rol: string;
}

  class UsuarioService  {
    async validarUsuario(usuario: string ,contrasenia: string ) {
      const usuarioId = await axios.post(`${REST_SERVER_URL}/usuarioLogin`, { contrasenia: contrasenia, usuario: usuario})
      return usuarioId.data
    }

    getUsuarioLogeado = () =>{ 
      const userStorage = localStorage.getItem(TOKEN_KEY)
      return JSON.parse(userStorage || '{}')
    }

    getRolUsuario = ()=>{
      const token = this.getUsuarioLogeado()
      let esChofer = null
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        esChofer = decoded.rol == 'CONDUCTOR';
        return esChofer
      }
    }
  
  }

 
  const usuarioService = new UsuarioService()
  export default usuarioService