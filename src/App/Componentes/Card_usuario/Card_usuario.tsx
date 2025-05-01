import React, { use, useState } from 'react';
import CalificarViajeModal from '../Perfil/calificar'; // Asegúrate de que la ruta sea correcta
import './CardUsuario.css';
import GroupIcon from '@mui/icons-material/Group';

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import perfilService from '../../Services/Perfil';
import { enqueueSnackbar } from 'notistack';
import usuarioService from '../../Services/LoginService';

interface Viaje {
  idViaje: number;
  nombre: string;
  cantidadDePasajeros: number;
  origen: string;
  destino: string;
  fechaInicio: string;
  importe: number;
  puedeCalificar: boolean;
  fechaFin: string;
  foto: string;
}

interface Calificacion {
  idViaje: number;
  estrellas: number;
  mensaje: string;
}

interface CardUsuarioProps {
viaje: Viaje
}

const CardUsuario: React.FC<CardUsuarioProps> = ({ viaje }) => {

  const userObject = usuarioService.getUsuarioLogeado()
  const esChofer = usuarioService.getRolUsuario()
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [calificacionEnviada, setCalificacionEnviada] = useState(false);
  const formatoHorario = `${viaje.fechaInicio < 10 ? '0' : ''}${viaje.fechaInicio} - ${viaje.fechaFin}`;

  const handleCalificar = async (calificacion: Calificacion) => {
    try {
      await perfilService.calificarViaje(
        userObject,
        calificacion
      );
      setCalificacionEnviada(true);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message
      enqueueSnackbar(errorMessage, {      
        variant: 'error',
        autoHideDuration: 1000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      })
    }
  };

  return (
    <div className="card-usuario">
      <Card className="card-usuario__card">
        <CardHeader
          className="card-usuario__header"
          title={
            <Box className="card-usuario__header-content">
              <Typography variant="h6" className="card-usuario__name">
                {viaje.nombre}
              </Typography>
              <Typography className="card-usuario__people-count">
                {viaje.cantidadDePasajeros} <GroupIcon fontSize="small" />
              </Typography>
            </Box>
          }
          action={
            <Box className="card-usuario__avatar-container">
              <Avatar src={viaje.foto} alt={viaje.nombre} />
            </Box>
          }
        />
        <CardContent className="card-usuario__content">
          <Typography variant="body1">
            <strong>Desde:</strong> {viaje.origen}
          </Typography>
          <Typography variant="body1">
            <strong>Hacia:</strong> {viaje.destino}
          </Typography>
          <Typography variant="body1">
            <strong>Horario:</strong> {formatoHorario}
          </Typography>
          <Typography variant="body1">
            <strong>Importe:</strong> ${viaje.importe}
          </Typography>

          {!esChofer && viaje.puedeCalificar && !calificacionEnviada && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 2,
                  
                }}
              >
                <Button
                  variant="contained"
                  sx={{backgroundColor:'#5508a7',width:'100%'}}
                  onClick={() => setModalAbierto(true)} // Abrir el modal
                >
                  Calificar Viaje
                </Button>
              </Box>

              <CalificarViajeModal
                open={modalAbierto}
                onClose={() => setModalAbierto(false)} // Cerrar el modal
                idViaje={viaje.idViaje}
                onCalificar={handleCalificar}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardUsuario;
