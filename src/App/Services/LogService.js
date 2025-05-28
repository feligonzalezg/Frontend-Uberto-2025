import axios from 'axios';
import { REST_SERVER_URL } from './configuracion';

class LogService {
  async registrarClick(registro, token) {
    try {
      await axios.post(`${REST_SERVER_URL}/registrar`, registro, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  }

  async totalClicksConductor(token) {
    try {
      const response = await axios.get(`${REST_SERVER_URL}/logs/chofer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response; // Agregá este return si lo vas a usar en el componente
    } catch (error) {
      console.error('Error obteniendo clicks del chofer:', error);
    }
  }
}
const logService = new LogService();
export default logService;
