import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import homeService from '../../Services/HomeService';
import CardChofer from '../../Componentes/CardChofer/CardChofer';
import CardUsuario from '../../Componentes/Card_usuario/Card_usuario';
import { format } from 'date-fns';

const HomeUsuario: React.FC = () => {
  const [resultados, setResultados] = useState<any[]>([]);
  const [cantidadDePasajeros, setCantidadPasajeros] = useState(0);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [usernameViajero, setUsernameViajero] = useState('');
  const [duracion, setDuracion] = useState<number | null>(null);

  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage || '{}');
  const esChofer = userObject.esChofer;

  const handleCantidadPasajerosChange = (increment: boolean) => {
    setCantidadPasajeros((prev) =>
      increment ? Math.min(4, prev + 1) : Math.max(0, prev - 1)
    );
  };

  // Función para generar duración aleatoria entre 5 y 60 minutos
  const generarDuracionRandom = () => {
    return Math.floor(Math.random() * (60 - 5 + 1)) + 5;
  };

  const handleBuscar = async () => {
    const id = userObject.id;

    try {
      let response;
      const fechaFormateada = fecha
        ? format(new Date(fecha), 'dd/MM/yyyy HH:mm')
        : '';

      if (esChofer) {
        const busquedaViajes = {
          usernameViajero,
          origen,
          destino,
          cantidadDePasajeros,
        };
        console.log('antes de');
        response = await homeService.BuscarViajes(busquedaViajes, id);
      } else {
        const duracionAleatoria = generarDuracionRandom(); // Generamos duración
        setDuracion(duracionAleatoria); // Guardamos en el estado
        const busquedaDTO = {
          fecha: fechaFormateada,
          duracion: duracionAleatoria,
          cantidadDePasajeros,
        };
        response = await homeService.ChoferesDisponibles(busquedaDTO);
      }

      setResultados(response || []);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: 'auto',
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f0eff2',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: 'start',
          color: '#5508a7',
          fontWeight: 'bold',
        }}
      >
        {esChofer ? 'Viajes a Realizar' : 'Realizar un Viaje'}
      </Typography>

      {esChofer && (
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nombre usuario"
          value={usernameViajero}
          onChange={(e) => setUsernameViajero(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      )}

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Origen"
        value={origen}
        onChange={(e) => setOrigen(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {!esChofer && (
        <TextField
          fullWidth
          variant="outlined"
          type="datetime-local" // Permite seleccionar fecha y hora
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 2 }}
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          value={cantidadDePasajeros}
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <IconButton onClick={() => handleCantidadPasajerosChange(true)}>
          <AddCircleIcon sx={{ color: '#9348e4' }} />
        </IconButton>
        <IconButton onClick={() => handleCantidadPasajerosChange(false)}>
          <RemoveCircleIcon sx={{ color: '#9348e4' }} />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        sx={{ width: '100%', backgroundColor: '#9348e4', color: '#fff' }}
        onClick={handleBuscar}
      >
        {esChofer ? 'Filtrar' : 'Buscar'}
      </Button>

      <Divider sx={{ my: 2 }} />
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: 'start',
          color: '#5508a7',
          fontWeight: 'bold',
        }}
      >
        Resultados
      </Typography>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {resultados.map((item, index) =>
          esChofer ? (
            <CardUsuario
              key={index}
              nombre={item.nombre}
              cantidadPersonas={item.cantidadDePasajeros}
              desde={item.origen}
              hacia={item.destino}
              horario={item.fechaInicio}
              importe={item.importe}
              pendiente={item.pendiente}
            />
          ) : (
            <CardChofer
              patente={item.patente}
              nombre={item.nombreYApellido}
              modelo={item.movil}
              año={item.año}
              tarifa={item.importe}
              calificacion={item.calificacion}
              origen={origen} // Enviar datos del viaje
              destino={destino}
              duracion={duracion}
              fecha={fecha}
              cantidadPasajeros={cantidadDePasajeros}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default HomeUsuario;
