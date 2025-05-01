import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'
import { ImageNotSupported } from '@mui/icons-material'

 
class PerfilService {

  async  dataUsuario(token) {
    
    if (!token) {
        throw new Error('No se encontró token de autenticación');
    }
    try {
          const response = await axios.get(`${REST_SERVER_URL}/perfil`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
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
  async getComentariosParaConfirmacion(token,id) {
    
    try {
      const comentarios = await axios.get(
        `${REST_SERVER_URL}/comentariosParaConfirmar/${id}`,
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

  async actualizarUsuario(token, usuario) {
      const actualizarUser = await axios.patch(
        `${REST_SERVER_URL}/actualizarUsuario`,
        usuario,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return actualizarUser.data;
  }

  async cargarSaldo(token, monto) {
    try {
      const response = await axios.post(
        `${REST_SERVER_URL}/cargarSaldo`,null,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            monto: monto
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async agregarAmigo(token, amigoId) {
    console.log(token)
    try {
      const response = await axios.put(
        `${REST_SERVER_URL}/agregarAmigo/${amigoId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async eliminarAmigo(token, amigoId) {
    try {
      const response = await axios.delete(
        `${REST_SERVER_URL}/eliminarAmigo/${amigoId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async buscarUsuarios(query, token) {
    try {
      const response = await axios.get(
        `${REST_SERVER_URL}/buscarAmigos?query=${query}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  async actualizarImagen(token, imagen) {
    try {
      const actualizarImagen = await axios.patch(
        `${REST_SERVER_URL}/actualizarImagen?imagen=${imagen}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      return actualizarImagen.data
    } catch (error) {
      console.error(error)
    }
  }

  async confirmarViaje(viaje,token) {
    const response = await axios.post(`${REST_SERVER_URL}/confirmar`,
      viaje,  
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
      
    
    );
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
