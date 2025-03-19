import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CardChofer from '../../Componentes/CardChofer/CardChofer'

const HomeUsuario: React.FC = () => {
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1)
  const userStorage = localStorage.getItem('usuario')
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer

  const handleCantidadPasajerosChange = (increment: boolean) => {
    if (increment) {
      setCantidadPasajeros(cantidadPasajeros + 1)
    } else if (cantidadPasajeros > 1) {
      setCantidadPasajeros(cantidadPasajeros - 1)
    }
  }

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
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="body2"
            sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}
          >
            Usuario*
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ingresa tu nombre"
          />
        </Box>
      )}

      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}
        >
          Origen*
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ingresa el origen"
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}
        >
          Destino*
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ingresa el destino"
        />
      </Box>

      {!esChofer && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="body2"
            sx={{ textAlign: 'start', marginBottom: 1, color: '#9348e4' }}
          >
            Fecha*
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      )}

      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, textAlign: 'start', color: '#9348e4' }}
        >
          Cantidad de Pasajeros*
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={cantidadPasajeros}
            variant="outlined"
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
          className="button-primary"
          variant="contained"
          sx={{ width: '100%', backgroundColor: '#9348e4', color: '#fff' }}
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
        <Link to="/Confirmar_viaje">
  <CardChofer
    patente="AC 822 WC"
    nombre="Ivan Piñeda"
    modelo="FiaT Cronos"
    foto="https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg"
    año={2018}
    tarifa={5670}
    calificacion={5}
  />
</Link>
      </Box>
    </Box>
  )
}

export default HomeUsuario
