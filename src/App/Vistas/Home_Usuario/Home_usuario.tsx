import './HomeUsuario.css'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardUsuario from '../../Componentes/Card_usuario/Card_usuario';

const HomeUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);

  const handleCantidadPasajerosChange = (increment: boolean) => {
    if (increment) {
      setCantidadPasajeros(cantidadPasajeros + 1);
    } else if (cantidadPasajeros > 1) {
      setCantidadPasajeros(cantidadPasajeros - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/Confirmar_Viaje');
  };

  return (
    <div className="home-usuario">
      <Box className="home-usuario__header">
        <Typography variant="h5" className="home-usuario__title">
          Realizar un Viaje
        </Typography>
      </Box>

      <Box className="home-usuario__form">
        <form onSubmit={handleSubmit}>
          <InputLabel className="input-label" htmlFor="origen">
            Origen*
          </InputLabel>
          <TextField
            className="text-field"
            id="origen"
            fullWidth
            variant="outlined"
            placeholder="Ingresa el origen"
            required
          />

          <InputLabel className="input-label" htmlFor="destino">
            Destino*
          </InputLabel>
          <TextField
            className="text-field"
            id="destino"
            fullWidth
            variant="outlined"
            placeholder="Ingresa el destino"
            required
          />

          <InputLabel className="input-label" htmlFor="fecha">
            Fecha*
          </InputLabel>
          <TextField
            className="text-field"
            id="fecha"
            fullWidth
            variant="outlined"
            type="date"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <InputLabel className="input-label" htmlFor="cantidadPasajeros">
            Cantidad de Pasajeros*
          </InputLabel>
          <Box className="cantidad-pasajeros">
            <TextField
              className="text-field cantidad-pasajeros__field"
              value={cantidadPasajeros}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <Box className="cantidad-pasajeros__controls">
              <IconButton onClick={() => handleCantidadPasajerosChange(true)}>
                <AddCircleIcon className="icon" />
              </IconButton>
              <IconButton onClick={() => handleCantidadPasajerosChange(false)}>
                <RemoveCircleIcon className="icon" />
              </IconButton>
            </Box>
          </Box>

          <Button className="button-gradient" type="submit" variant="contained">
            Buscar
          </Button>
        </form>
      </Box>

      <Divider className="divider" />

      <Box className="home-usuario__results">
        <Typography variant="h5" className="home-usuario__results-title">
          Resultados
        </Typography>
        <CardUsuario
          nombre="Roberto Pettinato"
          cantidadPersonas={2}
          foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
          desde="Av Siempre viva"
          hacia="Calle falsa"
          horario={1800}
          importe={1500}
        />
        <CardUsuario
          nombre="Roberto Pettinato"
          cantidadPersonas={2}
          foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
          desde="Av Siempre viva"
          hacia="Calle falsa"
          horario={1800}
          importe={1500}
        />
      </Box>
    </div>
  );
};

export default HomeUsuario;

