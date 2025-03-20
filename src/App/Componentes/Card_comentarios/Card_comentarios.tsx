import './CardComentario.css';
import { Card, CardHeader, CardContent, Avatar, Typography, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete'

interface ComentarioProps {
  nombre: string;
  fecha: string;
  //foto: string;
  puntuacion: number;
  comentario: string;
}

const CardComentario: React.FC<ComentarioProps> = ({ nombre, fecha, foto, puntuacion, comentario }) => {
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer

  return (
    <div className="card-comentario">
      <Card className="card-comentario__card">
        <CardHeader
          className="card-comentario__header"
          avatar={<Avatar src={foto} alt={nombre} className="card-comentario__avatar" />}
          title={
            <Box className="card-comentario__header-content">
              <Typography variant="h6" className="card-comentario__name">{nombre}</Typography>
              <Typography variant="body2" className="card-comentario__date">{fecha}</Typography>
            </Box>
          }
          action={
            <Box className="card-comentario__rating">
              <Typography variant="body2" className="card-comentario__rating-text">
                {puntuacion}
              </Typography>
              <StarIcon className="card-comentario__star-icon" />
              {window.location.pathname == "/Perfil_Usuario" && !esChofer &&(
              <DeleteIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />
              )}
            </Box>
          }
        />
        <CardContent className="card-comentario__content">
          <Typography variant="body1">{comentario}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComentario;
