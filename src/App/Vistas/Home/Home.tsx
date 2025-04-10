import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import homeService from '../../Services/HomeService';
import CardChofer from '../../Componentes/CardChofer/CardChofer';
import CardUsuario from '../../Componentes/Card_usuario/Card_usuario';
import { format } from 'date-fns';

const HomeUsuario: React.FC = () => {
  const [resultados, setResultados] = useState<any[]>([]);
  const [cantidadDePasajeros, setCantidadPasajeros] = useState(1);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [usernameViajero, setUsernameViajero] = useState('');
  const [duracion, setDuracion] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage || '{}');
  const esChofer = userObject.esChofer;

  const handleCantidadPasajerosChange = (increment: boolean) => {
    setCantidadPasajeros((prev) =>
      increment ? Math.min(4, prev + 1) : Math.max(1, prev - 1)
    );
  };

  const generarDuracionRandom = () => {
    return Math.floor(Math.random() * (60 - 5 + 1)) + 5;
  };

  const handleBuscar = async () => {
    const id = userObject.id;
    setError(null);
    setResultados([]);

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
        response = await homeService.BuscarViajes(busquedaViajes, id);
      } else {
        const duracionAleatoria = generarDuracionRandom();
        setDuracion(duracionAleatoria);

        if (!origen.trim() || !destino.trim() || !fecha.trim()) {
          throw new Error('Debe completar todos los campos');
        }

        const busquedaDTO = {
          fecha: fechaFormateada,
          duracion: duracionAleatoria,
          cantidadDePasajeros,
        };
        response = await homeService.ChoferesDisponibles(busquedaDTO);
      }

      setResultados(response || []);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error al realizar la búsqueda');
      }
      console.error('Error en la búsqueda:', error);
    }
  };
  const validarCamposLlenos = () => {
    if (esChofer) {
      return (
        usernameViajero.trim() !== '' &&
        origen.trim() !== '' &&
        destino.trim() !== ''
      );
    }
    return origen.trim() !== '' && destino.trim() !== '' && fecha.trim() !== '';
  };

  const getTodayMinDatetime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
    const day = String(now.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
    const hours = String(now.getHours()).padStart(2, '0'); // Hora actual
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos actuales

    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
          label="Usuario"
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
        label="Origen"
        value={origen}
        onChange={(e) => setOrigen(e.target.value)}
        sx={{ marginBottom: 2 }}
        error={!!error && !origen.trim()}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Destino"
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        sx={{ marginBottom: 2 }}
        error={!!error && !destino.trim()}
      />

      {!esChofer && (
        <TextField
          fullWidth
          variant="outlined"
          label="Fecha"
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ 
            marginBottom: 2,
            '& .MuiInputBase-input::-webkit-calendar-picker-indicator': {
              filter: 'invert(0.5)' 
            }}}
          error={!!error && !fecha.trim()}
          inputProps={{ min: getTodayMinDatetime() }}
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <TextField
          value={cantidadDePasajeros}
          label="Cantidad de Pasajeros"
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <Box>
          <IconButton onClick={() => handleCantidadPasajerosChange(true)}>
            <AddCircleIcon sx={{ color: '#9348e4' }} />
          </IconButton>
          <IconButton onClick={() => handleCantidadPasajerosChange(false)}>
            <RemoveCircleIcon sx={{ color: '#9348e4' }} />
          </IconButton>
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{ width: '100%', backgroundColor: '#9348e4', color: '#fff' }}
        onClick={handleBuscar}
        disabled={!esChofer && !validarCamposLlenos()}
      >
        {esChofer ? 'Filtrar' : 'Buscar'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

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
        {resultados.length > 0 ? (
          resultados.map((item, index) =>
            esChofer ? (
              <CardUsuario
                key={index}
                nombre={item.nombre}
                cantidadPersonas={item.cantidadDePasajeros}
                desde={item.origen}
                hacia={item.destino}
                horario={item.fechaInicio}
                importe={item.importe}
                fechaFin={item.fechaFin}
              />
            ) : (
              <CardChofer
                key={index}
                dominio={item.dominio}
                nombre={item.nombreYApellido}
                marca={item.marca}
                modelo={item.modelo}
                anio={item.anio}
                id={item.id}
                tarifa={item.importe}
                calificacion={item.calificacion}
                foto={item.foto}
                esChofer={item.esChofer}
                origen={origen}
                destino={destino}
                duracion={duracion}
                fecha={fecha}
                cantidadDePasajeros={cantidadDePasajeros}
              />
            )
          )
        ) : (
          <Typography sx={{ mt: 2 }}>
            {'No hay resultados disponibles'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HomeUsuario;
