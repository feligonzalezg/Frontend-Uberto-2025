import './CardUsuario.css';
import { Card, CardHeader, CardContent, Avatar, Typography, Box, Button } from "@mui/material";

interface CardUsuarioProps {
  nombre: string;
  cantidadPersonas: number;
  desde: string;
  hacia: string;
  horario: number;
  importe: number;
}

const handleCalificar = (viaje) => {
  console.log('Calificando viaje:', viaje);
};

const CardUsuario: React.FC<CardUsuarioProps> = ({ nombre, cantidadPersonas, desde, hacia, horario, importe }) => {
  const formatoHorario = `${horario < 10 ? '0' : ''}${horario}:00`;

  return (
    <div className="card-usuario">
      <Card className="card-usuario__card">
        <CardHeader
          className="card-usuario__header"
          title={
            <Box className="card-usuario__header-content">
              <Typography variant="h6" className="card-usuario__name">{nombre}</Typography>
              <Typography variant="body2" className="card-usuario__people-count">{`Personas: ${cantidadPersonas}`}</Typography>
            </Box>
          }
          action={
            <Box className="card-usuario__avatar-container">
              <Avatar alt={nombre} />
            </Box>
          }
        />
        <CardContent className="card-usuario__content">
          <Typography variant="body1"><strong>Desde:</strong> {desde}</Typography>
          <Typography variant="body1"><strong>Haya:</strong> {hacia}</Typography>
          <Typography variant="body1"><strong>Horario:</strong> {formatoHorario}</Typography>
          <Typography variant="body1"><strong>Importe:</strong> ${importe}</Typography>
        </CardContent>
     
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', 
            marginTop: 2, 
            marginBottom: 2, 
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#8A2BE2', 
              '&:hover': {
                backgroundColor: '#7B1FA2', 
              },
            }}
            onClick={() => handleCalificar({ nombre, desde, hacia, horario, importe })}
          >
            Calificar Viaje
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default CardUsuario;