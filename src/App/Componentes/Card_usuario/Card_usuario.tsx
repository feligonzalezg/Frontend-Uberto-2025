import './CardUsuario.css';
import { Card, CardHeader, CardContent, Avatar, Typography, Box } from "@mui/material";

interface CardUsuarioProps {
  nombre: string;
  cantidadPersonas: number;
  desde: string;
  hacia: string;
  horario: number;
  importe: number;
}

const CardUsuario: React.FC<CardUsuarioProps> = ({ nombre, cantidadPersonas, desde, hacia, horario, importe }) => {

  const formatoHorario = `${horario < 10 ? '0' : ''}${horario}:00`;

  //const fotoUsuario = foto || "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1";

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
          <Typography variant="body1"><strong>Hacia:</strong> {hacia}</Typography>
          <Typography variant="body1"><strong>Horario:</strong> {formatoHorario}</Typography>
          <Typography variant="body1"><strong>Importe:</strong> ${importe}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardUsuario;
