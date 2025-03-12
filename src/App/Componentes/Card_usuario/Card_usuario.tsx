import React from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Box } from "@mui/material";

interface CardUsuarioProps {
  nombre: string;
  cantidadPersonas: number;
  foto: string;
  desde: string;
  hacia: string;
  horario: number;
  importe: number;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({ nombre, cantidadPersonas, foto, desde, hacia, horario, importe }) => {

  const formatoHorario = `${horario < 10 ? '0' : ''}${horario}:00`;

  const fotoUsuario = foto || "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1";

  return (
    <Box sx={{  display: 'flex', justifyContent: 'center' }}>
      <Card sx={{
        margin: 'auto',
        width: '100%', 
        maxWidth: 400,
        boxShadow: 3,
        borderRadius: 3,
        border: '1px solid black',
      }}>
        <CardHeader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#5508a7',
          }}
          title={
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', color: 'black' }}>
              <Typography variant="h6" sx={{ color: 'black' }}>{nombre}</Typography>
              <Typography variant="body2" sx={{ color: 'black' }}>{`Personas: ${cantidadPersonas}`}</Typography>
            </Box>
          }
          action={
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 2 }}>
              <Avatar src={fotoUsuario} alt={nombre} />
            </Box>
          }
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography variant="body1"><strong>Desde:</strong> {desde}</Typography>
          <Typography variant="body1"><strong>Hacia:</strong> {hacia}</Typography>
          <Typography variant="body1"><strong>Horario:</strong> {formatoHorario}</Typography>
          <Typography variant="body1"><strong>Importe:</strong> ${importe}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardUsuario;
