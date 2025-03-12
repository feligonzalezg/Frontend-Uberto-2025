import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const HomeUsuario: React.FC = () => {
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);

  const handleCantidadPasajerosChange = (increment: boolean) => {
    if (increment) {
      setCantidadPasajeros(cantidadPasajeros + 1);
    } else if (cantidadPasajeros > 1) {
      setCantidadPasajeros(cantidadPasajeros - 1);
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 600, 
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
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ width: "100%", backgroundColor: '#9348e4', color: '#fff' }}  
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
};

export default HomeUsuario;
