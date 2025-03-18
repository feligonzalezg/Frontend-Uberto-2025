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

  async getViajesRealizados(userObject){
    
    try {
      console.log("llegue al service del perfil")
      const viajesRealizados = await axios.get(`${REST_SERVER_URL}/viajesRealizados/${userObject.id}`, {
          params: {
            esChofer: userObject.esChofer
          }
        })
      console.log(viajesRealizados.data)
      return viajesRealizados.data
    }

catch (error) {
    console.error(error)
  }

}



async getViajesPendientes(userObject){
    
  try {
    console.log("llegue al service del perfil")
    const viajesPendientes = await axios.get(`${REST_SERVER_URL}/viajesPendientes/${userObject.id}`, {
        params: {
          esChofer: userObject.esChofer
        }
      })
    console.log(viajesPendientes.data)
    return viajesPendientes.data
  }

catch (error) {
  console.error(error)
}

}

async actualizarUsuario(userObject, usuario){
    
  try {
    console.log("llegue al service del perfil")
    const viajesPendientes = await axios.post(`${REST_SERVER_URL}/actualizarUsuario/${userObject.id}`, {
        params: {
          esChofer: userObject.esChofer
        }
      })
    console.log(viajesPendientes.data)
    return viajesPendientes.data
  }

catch (error) {
  console.error(error)
}

}
 

async cargarSaldo(userObject,monto){
    
  try {
    console.log("llegue al service del perfil")
    const cargarSaldo = await axios.post(`${REST_SERVER_URL}/cargarSaldo/${userObject.id}`, {
        params: {
          esChofer: userObject.esChofer,
          monto: monto
        }
      })
    console.log(cargarSaldo.data)
    return cargarSaldo.data
  }

catch (error) {
  console.error(error)
}

}

async buscarUsuarios(query){
    
  try {
    console.log("llegue al service del perfil")
    const response = await axios.get(`${REST_SERVER_URL}/usuarios/buscar?query=${query}`);
    console.log(response.data)
    return response.data;

  }

catch (error) {
  console.error(error)
}

}



}





  
const perfilService = new PerfilService()
export default perfilService