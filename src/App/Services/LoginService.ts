import axios from 'axios'
import { REST_SERVER_URL } from '../Services/configuracion'


  class UsuarioService  {
    async validarUsuario(usuario,contrasenia) {
      try {
      console.log("llegue al service")
      const usuarioId = await axios.post(${REST_SERVER_URL}/usuarioLogin, { contrasenia: contrasenia, usuario: usuario})
      console.log(usuarioId.data)
      return usuarioId.data
      }
      catch (error) {
        console.error('Error de inicio de sesión:', error)
        throw error// Lanza el error para que pueda ser manejado en el componente que llama a esta función
      }
    }

    cerrarSession(){
      return usuarioId (null)
    }
 
  }



  const usuarioService = new UsuarioService()
  export default usuarioService