import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Divider, Alert,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { format } from 'date-fns';
import homeService from '../../Services/HomeService';
import CardChofer from '../../Componentes/CardChofer/CardChofer';

interface Props {
  token: string;
}

const HomeViajero: React.FC<Props> = ({ token }) => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [duracion, setDuracion] = useState(0);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const handleCantidad = (sumar: boolean) => {
    setCantidad((prev) => sumar ? Math.min(4, prev + 1) : Math.max(1, prev - 1))
  }

  const getMinDatetime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16)
  }

  const generarDuracion = () => {
    return Math.floor(Math.random() * (60 - 5 + 1)) + 5
  }

  const handleBuscarViaje = async () => {
    try {
      if (!origen.trim() || !destino.trim() || !fecha.trim()) {
        throw new Error('Todos los campos deben estar completos');
      }

      const duracionAleatoria = generarDuracion()
      setDuracion(duracionAleatoria)

      const dto = {
        fecha: format(new Date(fecha), 'dd/MM/yyyy HH:mm'),
        duracion: duracionAleatoria,
        cantidadDePasajeros: cantidad,
      };

      const response = await homeService.ChoferesDisponibles(dto,token)
      console.log(dto)
      setResultados(response || [])
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Error al buscar')
    }
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#f0eff2', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ color: '#5508a7', fontWeight: 'bold', mb: 2 }}>
        Realizar un Viaje
      </Typography>

      <TextField fullWidth label="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} sx={{ mb: 2 }} />
      <TextField
        fullWidth
        type="datetime-local"
        label="Fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        inputProps={{ min: getMinDatetime() }}
        InputLabelProps={{ shrink: true }}
        sx={{
          mb: 2,
          '& .MuiInputBase-input::-webkit-calendar-picker-indicator': {
            filter: 'invert(0.5)',
          },
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField fullWidth label="Cantidad de Pasajeros" value={cantidad} InputProps={{ readOnly: true }} />
        <IconButton onClick={() => handleCantidad(true)}><AddCircleIcon sx={{ color: '#9348e4' }} /></IconButton>
        <IconButton onClick={() => handleCantidad(false)}><RemoveCircleIcon sx={{ color: '#9348e4' }} /></IconButton>
      </Box>

      <Button variant="contained"className="button-primary"onClick={handleBuscarViaje}>Buscar</Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ color: '#5508a7', fontWeight: 'bold', mb: 2 }}>
        Resultados
      </Typography>

      {resultados.length > 0 ? (
        resultados.map((chofer, idx) => (
          <CardChofer
            key={idx}
            chofer={chofer}
            origen={origen}
            destino={destino}
            duracion={duracion}
            fecha={fecha}
            cantidadDePasajeros={cantidad}
          />
        ))
      ) : (
        <Typography>No hay resultados disponibles</Typography>
      )}
    </Box>
  );
};

export default HomeViajero;
