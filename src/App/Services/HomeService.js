import axios from 'axios'
import { REST_SERVER_URL } from './configuracion'

class HomeService {
  async ChoferesDisponibles(busquedaDTO) {
    try {
      const choferes_Disponibles = await axios.post(
        `${REST_SERVER_URL}/home/buscar`,
        busquedaDTO,
      )
      return choferes_Disponibles.data
    } catch (error) {
      console.error(error)
    }
  }

  async BuscarViajes(busquedaViajes, id) {

    try {
      const viajes = await axios.post(
        `${REST_SERVER_URL}/filtrar/${id}`,
        busquedaViajes,
      )
      return viajes.data
    } catch (error) {
      console.error(error)
    }
  }
}

const homeService = new HomeService()

export default homeService
