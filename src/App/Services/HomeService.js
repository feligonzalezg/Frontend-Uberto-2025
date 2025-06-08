import axios from 'axios'
import { REST_SERVER_URL, TOKEN_KEY } from './configuracion'

class HomeService {
  async ChoferesDisponibles(busquedaDTO,token) {
    try {
      console.log(token)
      const choferes_Disponibles = await axios.post(
        `${REST_SERVER_URL}/home/buscar`,
        busquedaDTO,
        {headers:{
          'Authorization': `Bearer ${token}`,
      }},
      )
      return choferes_Disponibles.data
    } catch (error) {
      console.error(error)
    }
  }

  async BuscarViajes(busquedaViajes,token) {

    try {
      console.log(token)
      const viajes = await axios.post(`${REST_SERVER_URL}/filtrar`,
        busquedaViajes,
        {headers:{
          'Authorization': `Bearer ${token}`,
      }},
      )
      return viajes.data
    } catch (error) {
      console.error(error)
    }
  }

  async ultimoViaje(token) {
    console.log("este es el token", token)
    try {
      const viaje = await axios.get(`${REST_SERVER_URL}/ultimaBusqueda`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return viaje.data;
    } catch (error) {
      console.error('Error al obtener la última búsqueda:', error);
      return null;
    }
  }
}

const homeService = new HomeService();

export default homeService
