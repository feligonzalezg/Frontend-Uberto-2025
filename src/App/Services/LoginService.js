import axios from 'axios'
import { REST_SERVER_URL } from './configuracion'

  class UsuarioService  {
    async validarUsuario(usuario,contrasenia) {
      const usuarioId = await axios.post(`${REST_SERVER_URL}/usuarioLogin`, { contrasenia: contrasenia, usuario: usuario})
      return usuarioId.data
    }

    cerrarSession(){
      return usuarioId (null)
    }
  
  }

  const usuarioService = new UsuarioService()
  export default usuarioService