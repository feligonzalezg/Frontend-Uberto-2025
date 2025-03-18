import axios from 'axios'
import { REST_SERVER_URL } from './configuracion'

  class PerfilService  {

    async dataUsuario(userObject) {
        try {
          console.log("llegue al service del perfil")
          const usuario = await axios.get(`${REST_SERVER_URL}/perfil/${userObject.id}`, {
            params: {
              esChofer: userObject.esChofer
            }
          })
          console.log(usuario.data)
          return usuario.data
        }
    
    catch (error) {
        console.error(error)
      }

    }

    async getComentarios(userObject) {
      try {
        console.log("llegue al service del perfil")
        const comentarios = await axios.get(`${REST_SERVER_URL}/comentario/${userObject.id}`, {
            params: {
              esChofer: userObject.esChofer
            }
          })
        console.log(comentarios.data)
        return comentarios.data
      }
  
  catch (error) {
      console.error(error)
    }

  }



  }

const perfilService = new PerfilService()
export default perfilService