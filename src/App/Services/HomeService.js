import axios from 'axios'
import { REST_SERVER_URL } from './configuracion'

class HomeService {
  async ChoferesDisponibles(busquedaDTO) {
    try {
      console.log('llegué al service del Home')
      console.log(busquedaDTO)
      const choferes_Disponibles = await axios.post(
        `${REST_SERVER_URL}/home/buscar`,
        busquedaDTO,
      )
      console.log(choferes_Disponibles.data) // Verifica los datos recibidos
      return choferes_Disponibles.data
    } catch (error) {
      console.error(error)
    }
  }

  async BuscarViajes(busquedaViajes, id) {
    console.log('LLegue al service')
    console.log(busquedaViajes)
    console.log(id)

    try {
      const viajes = await axios.post(
        `${REST_SERVER_URL}/filtrar/${id}`,
        busquedaViajes,
      )
      console.log(busquedaViajes.data)
      return viajes.data
    } catch (error) {
      console.error(error)
    }
  }
}

const homeService = new HomeService()

export default homeService
