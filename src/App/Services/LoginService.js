import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'

  class UsuarioService  {
    async validarUsuario(usuario,contrasenia) {
      const usuarioId = await axios.post(`${REST_SERVER_URL}/usuarioLogin`, { contrasenia: contrasenia, usuario: usuario})
      return usuarioId.data
    }

    getUsuarioLogeado = () =>{ 
      const userStorage = localStorage.getItem(TOKEN_KEY)
      return JSON.parse(userStorage || '{}')
    }

    
  
  }

 
  const usuarioService = new UsuarioService()
  export default usuarioService