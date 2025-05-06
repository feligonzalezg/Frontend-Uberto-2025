import React, { useState } from 'react';
import {Box, Typography, TextField, Button, IconButton, Divider, Alert} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import homeService from '../../Services/HomeService';
import CardUsuario from '../../Componentes/Card_usuario/Card_usuario';

interface Props {
  token: string;
}

const HomeChofer: React.FC<Props> = ({ token }) => {
  const [usernameViajero, setUsernameViajero] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const handleCantidad = (sumar: boolean) => {
    setCantidad((prev) => sumar ? Math.min(4, prev + 1) : Math.max(1, prev - 1))
  }

  const handleFiltrar = async () => {
    try {
      const dto = {
        usernameViajero,
        origen,
        destino,
        cantidadDePasajeros: cantidad
      }
      const response = await homeService.BuscarViajes(dto, token)
      setResultados(response || [])
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Error al buscar')
    }
  }
  

  return (
    <Box sx={{ p: 2, backgroundColor: '#f0eff2', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ color: '#5508a7', fontWeight: 'bold', mb: 2 }}>
        Viajes a Realizar
      </Typography>

      <TextField fullWidth label="Usuario" value={usernameViajero} onChange={(e) => setUsernameViajero(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField fullWidth label="Cantidad de Pasajeros" value={cantidad} InputProps={{ readOnly: true }} />
        <IconButton onClick={() => handleCantidad(true)}><AddCircleIcon sx={{ color: '#9348e4' }} /></IconButton>
        <IconButton onClick={() => handleCantidad(false)}><RemoveCircleIcon sx={{ color: '#9348e4' }} /></IconButton>
      </Box>

      <Button variant="contained"className="button-primary"onClick={handleFiltrar}>Filtrar</Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ color: '#5508a7', fontWeight: 'bold', mb: 2 }}>
        Resultados
      </Typography>

      {resultados.length > 0 ? (
        resultados.map((viaje, idx) => (
          <CardUsuario key={idx} viaje={viaje} />
        ))
      ) : (
        <Typography>No hay resultados disponibles</Typography>
      )}
    </Box>
  );
};

export default HomeChofer;
