import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'
import { ImageNotSupported } from '@mui/icons-material'

 
class PerfilService {

  async  dataUsuario(userObject) {
    
    if (!userObject) {
        throw new Error('No se encontró token de autenticación');
    }
    try {
          const response = await axios.get(`${REST_SERVER_URL}/perfil`, {
              headers: {
                  'Authorization': `Bearer ${userObject}`,
              },
          });

        return response.data;
        
    } catch (error) {
        console.error(error);

    }
}

  async getComentarios(token) {
    
    try {
      const comentarios = await axios.get(
        `${REST_SERVER_URL}/comentario`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
      );
      return comentarios.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getViajesRealizados(token) {
    try {
      const viajesRealizados = await axios.get(
        `${REST_SERVER_URL}/viajesRealizados`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return viajesRealizados.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getViajesPendientes(token) {
    try {
      const viajesPendientes = await axios.get(
        `${REST_SERVER_URL}/viajesPendientes`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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


  async calificarViaje(token,calificacion) {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/calificar`,
        calificacion,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Ocurrió un error al calificar viaje: ', error);
    }
  }

  async deleteComentario(token, idComentario) {
    try {
      const comentario = await axios.delete(
        `${REST_SERVER_URL}/eliminarComentario/${idComentario}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return comentario.data;
    } catch (error) {
      console.error(error);
    }
  }

}

const perfilService = new PerfilService();
export default perfilService;
