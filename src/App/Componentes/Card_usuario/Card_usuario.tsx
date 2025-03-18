import React, { useState } from "react";
import CalificarViajeModal from "../Perfil/calificar"; // Asegúrate de que la ruta sea correcta
import "./CardUsuario.css";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";

interface CardUsuarioProps {
  idChofer: string; // Nuevo: ID del chofer
  nombre: string;
  cantidadPersonas: number;
  desde: string;
  hacia: string;
  horario: number;
  importe: number;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({
  idChofer,
  nombre,
  cantidadPersonas,
  desde,
  hacia,
  horario,
  importe,
}) => {
  const userStorage = localStorage.getItem('usuario')
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer
  const [modalAbierto, setModalAbierto] = useState(false);
  const formatoHorario = `${horario < 10 ? "0" : ""}${horario}:00`;

  const handleCalificar = (calificacion) => {
    console.log("Calificación enviada:", {
      ...calificacion,
      //idChofer, hay que tomar el id del chofer 
    });
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
              <Typography
                variant="body2"
                className="card-usuario__people-count"
              >{`Personas: ${cantidadPersonas}`}</Typography>
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
        </CardContent>

        {!esChofer && (
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
          onCalificar={handleCalificar} // Función para manejar la calificación
        />
        </>
        )}

      </Card>
    </div>
  );
};

export default CardUsuario;