import axios from 'axios'
import { REST_SERVER_URL } from './configuracion'
import { ImageNotSupported } from '@mui/icons-material'


class PerfilService {
  async dataUsuario(userObject) {
    try {
      const usuario = await axios.get(
        `${REST_SERVER_URL}/perfil/${userObject.id}`,
        {
          params: {
            esChofer: userObject.esChofer,
          },
        }
      );
      return usuario.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getComentarios(userObject) {
    try {
      const comentarios = await axios.get(
        `${REST_SERVER_URL}/comentario/${userObject.id}`,
        {
          params: {
            esChofer: userObject.esChofer,
          },
        }
      );
      return comentarios.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getViajesRealizados(userObject) {
    try {
      const viajesRealizados = await axios.get(
        `${REST_SERVER_URL}/viajesRealizados/${userObject.id}`,
        {
          params: {
            esChofer: userObject.esChofer,
          },
        }
      );
      return viajesRealizados.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getViajesPendientes(userObject) {
    try {
      const viajesPendientes = await axios.get(
        `${REST_SERVER_URL}/viajesPendientes/${userObject.id}`,
        {
          params: {
            esChofer: userObject.esChofer,
          },
        }
      );
      return viajesPendientes.data;
    } catch (error) {
      console.error(error);
    }
  }

  async actualizarUsuario(userObject, usuario) {
      const actualizarUser = await axios.patch(
        `${REST_SERVER_URL}/actualizarUsuario/${userObject.id}`,
        usuario
      );
      return actualizarUser.data;
  }

  async cargarSaldo(userObject, monto) {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/cargarSaldo/${userObject.id}`,
        null,
        {
          params: {
            esChofer: userObject.esChofer,
            monto: monto,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async agregarAmigo(userId, amigoId) {
    try {
      const response = await axios.put(
        `${REST_SERVER_URL}/agregarAmigo/${userId}/${amigoId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async eliminarAmigo(userId, amigoId) {
    try {
      const response = await axios.delete(
        `${REST_SERVER_URL}/eliminarAmigo/${userId}/${amigoId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async buscarUsuarios(query, userId) {
    try {
      const response = await axios.get(
        `${REST_SERVER_URL}/buscarAmigos/${userId}?query=${query}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  async actualizarImagen(userObject, imagen) {
    try {
      const actualizarImagen = await axios.patch(
        `${REST_SERVER_URL}/actualizarImagen/${userObject.id}?esChofer=${userObject.esChofer}&imagen=${imagen}`,
      
      )
      return actualizarImagen.data
    } catch (error) {
      console.error(error)
    }
  }

  async confirmarViaje(viaje) {
    const response = await axios.post(`${REST_SERVER_URL}/confirmar`, viaje);
    return response.data;
  }


  async calificarViaje(userId, calificacion) {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/calificar/${userId}`,
        calificacion
      );
      return response.data;
    } catch (error) {
      console.error('Ocurrió un error al calificar viaje: ', error);
    }
  }

  async deleteComentario(idUsuario, idComentario) {
    try {
      const comentario = await axios.delete(
        `${REST_SERVER_URL}/eliminarComentario/${idUsuario}/${idComentario}`
      );
      return comentario.data;
    } catch (error) {
      console.error(error);
    }
  }

}

const perfilService = new PerfilService();
export default perfilService;
