import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Divider } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CardUsuario from "../../Componentes/Card_usuario/Card_usuario";
import { useNavigate } from 'react-router-dom'

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
    <Box sx={{ 
      width: '100%', 
      margin: 'auto', 
      padding: 2, 
      boxShadow: 3, 
      borderRadius: 2, 
      backgroundColor: '#f0eff2'  
    }}>
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'start', color: '#5508a7', fontWeight: 'bold' }}>
  Realizar un Viaje
</Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}>
          Origen*
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ingresa el origen"
          sx={{ color: '#9348e4' }} 
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}>
          Destino*
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ingresa el destino"
          sx={{ color: '#9348e4' }}  
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ textAlign: 'start', marginBottom: 1, color: '#9348e4' }}>
          Fecha*
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ color: '#9348e4' }}  
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body2" sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}>
          Cantidad de Pasajeros*
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={cantidadPasajeros}
            variant="outlined"
            fullWidth
            sx={{ textAlign: 'center', color: '#9348e4' }}  
            InputProps={{
              readOnly: true,
            }}
          />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton onClick={() => handleCantidadPasajerosChange(true)}>
              <AddCircleIcon sx={{ color: '#9348e4' }} /> 
            </IconButton>
            <IconButton onClick={() => handleCantidadPasajerosChange(false)}>
              <RemoveCircleIcon sx={{ color: '#9348e4' }} /> 
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
      <Button className="button-gradient" type="submit" variant="contained" onClick={handleSubmit}>
          Buscar
        </Button>
        <Divider sx={{ my: 2, backgroundColor: "#5508a7" }} />
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'start', color: '#5508a7', fontWeight: 'bold' }}>
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
    </Box>
  );
};

export default HomeUsuario;
