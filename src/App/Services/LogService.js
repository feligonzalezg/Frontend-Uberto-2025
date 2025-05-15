import axios from 'axios';
import { REST_SERVER_URL } from './configuracion';

class LogService {
  async registrarClick(nombreConductor, token) {
    console.log('este es el nombre', nombreConductor);

    try {
      await axios.post(
        `${REST_SERVER_URL}/logs/registrar/${nombreConductor}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error al registrar clic:', error);
    }
  }
}

const logService = new LogService();
export default logService;
