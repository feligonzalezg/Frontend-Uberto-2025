import React, { useState } from 'react';
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
} from "@mui/material";
import perfilService from "../../Services/Perfil";

interface CardUsuarioProps {
  idViaje: number;
  nombre: string;
  cantidadPersonas: number;
  desde: string;
  hacia: string;
  horario: string;
  importe: number;
  puedeCalificar: boolean;
  fechaFin: string;
}

interface Calificacion {
  idViaje: string;
  estrellas: number;
  mensaje: string;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({
  idViaje: id,
  nombre,
  cantidadPersonas,
  desde,
  hacia,
  horario,
  importe,
  puedeCalificar,
  fechaFin
}) => {
  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage!);
  const esChofer = userObject.esChofer;
  const [modalAbierto, setModalAbierto] = useState(false);
  const [calificacionEnviada, setCalificacionEnviada] = useState(false);
  const formatoHorario = `${horario < 10 ? '0' : ''}${horario} - ${fechaFin}`;

  const handleCalificar = async (calificacion: Calificacion) => {
    console.log(calificacion)
    try{
      const response = await perfilService.calificarViaje(userObject.id, calificacion)
      setCalificacionEnviada(response.puedeCalificar);
      console.log("Calificación enviada exisosamente:", {
        ...response,
      });
    } catch (error) {
      console.error('Error al calificar viaje:', error);
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
                {nombre}
              </Typography>
              <Typography className="card-usuario__people-count">
                {cantidadPersonas} <GroupIcon fontSize="small" />
              </Typography>
            </Box>
          }
          action={
            <Box className="card-usuario__avatar-container">
              <Avatar alt={nombre} />
            </Box>
          }
        />
        <CardContent className="card-usuario__content">
          <Typography variant="body1">
            <strong>Desde:</strong> {desde}
          </Typography>
          <Typography variant="body1">
            <strong>Hacia:</strong> {hacia}
          </Typography>
          <Typography variant="body1">
            <strong>Horario:</strong> {formatoHorario}
          </Typography>
          <Typography variant="body1">
            <strong>Importe:</strong> ${importe}
          </Typography>

        {!esChofer && puedeCalificar && !calificacionEnviada && (
          <> 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8A2BE2", // Violeta
              "&:hover": {
                backgroundColor: "#7B1FA2", // Violeta más oscuro al pasar el mouse
              },
            }}
            onClick={() => setModalAbierto(true)} // Abrir el modal
          >
            Calificar Viaje
          </Button>
        </Box>


      <CalificarViajeModal
          open={modalAbierto}
          onClose={() => setModalAbierto(false)} // Cerrar el modal
          idViaje={id}
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
