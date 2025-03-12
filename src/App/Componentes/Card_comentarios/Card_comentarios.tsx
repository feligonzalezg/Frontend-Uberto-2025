import React from "react";
import { Card, CardHeader, CardContent, Avatar, Typography, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface ComentarioProps {
  nombre: string;
  fecha: string;
  foto: string;
  puntuacion: number;
  comentario: string;
}

const CardComentario: React.FC<ComentarioProps> = ({ nombre, fecha, foto, puntuacion, comentario }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 3, border: '1px solid black' }}>
      <CardHeader
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        avatar={<Avatar src={foto} alt={nombre} sx={{ width: 50, height: 50 }} />}
        title={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6">{nombre}</Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>{fecha}</Typography>
          </Box>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: "110%", fontWeight: 'bold' }}>
              {puntuacion}
            </Typography>
            <StarIcon sx={{ color: 'black' }} />
          </Box>
        }
      />
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="body1">{comentario}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardComentario;
