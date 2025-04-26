import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'

  class UsuarioService  {
    async validarUsuario(usuario,contrasenia) {
      const usuarioId = await axios.post(`${REST_SERVER_URL}/usuarioLogin`, { contrasenia: contrasenia, usuario: usuario})
      localStorage.setItem(TOKEN_KEY, usuarioId)
      return usuarioId.data
    }

    cerrarSession(){
      return usuarioId (null)
    }

    getUsuarioLogeado = () =>{ 
      const userStorage = localStorage.getItem('usuario')
      return JSON.parse(userStorage || '{}')
    }

    
  
  }

 
  const usuarioService = new UsuarioService()
  export default usuarioService