import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CardUsuario from "../../Componentes/Card_usuario/Card_usuario";
import { useNavigate } from 'react-router-dom';
import './HomeUsuario.css';

const HomeUsuario: React.FC = () => {
  const navigate = useNavigate()
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);

  const handleCantidadPasajerosChange = (increment: boolean) => {
    if (increment) {
      setCantidadPasajeros(cantidadPasajeros + 1);
    } else if (cantidadPasajeros > 1) {
      setCantidadPasajeros(cantidadPasajeros - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/Confirmar_Viaje')
  }

  return (
    <Box className="home-container">
      <Typography variant="h5" className="title">Realizar un Viaje</Typography>

      <Box className="input-group">
        <Typography variant="body2" className="label">Origen*</Typography>
        <TextField fullWidth variant="outlined" placeholder="Ingresa el origen" className="input-field" />
      </Box>

      <Box className="input-group">
        <Typography variant="body2" className="label">Destino*</Typography>
        <TextField fullWidth variant="outlined" placeholder="Ingresa el destino" className="input-field" />
      </Box>

      <Box className="input-group">
        <Typography variant="body2" className="label">Fecha*</Typography>
        <TextField fullWidth variant="outlined" type="date" InputLabelProps={{ shrink: true }} className="input-field" />
      </Box>

      <Box className="input-group">
        <Typography variant="body2" className="label">Cantidad de Pasajeros*</Typography>
        <Box className="cantidad-pasajeros">
          <TextField value={cantidadPasajeros} variant="outlined" fullWidth className="input-field" InputProps={{ readOnly: true }} />
          <Box className="button-group">
            <IconButton onClick={() => handleCantidadPasajerosChange(true)}><AddCircleIcon className="icon" /></IconButton>
            <IconButton onClick={() => handleCantidadPasajerosChange(false)}><RemoveCircleIcon className="icon" /></IconButton>
          </Box>
        </Box>
      </Box>

      <Box className="submit-section">
        <Button className="submit-button" type="submit" variant="contained" onClick={handleSubmit}>
          Buscar
        </Button>
        <Divider className="divider" />
        <Typography variant="h5" className="title">Resultados</Typography>
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
    </Box>
  );
};

export default HomeUsuario;


