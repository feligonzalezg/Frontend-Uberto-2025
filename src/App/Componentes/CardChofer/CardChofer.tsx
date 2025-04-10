import './CardChofer.css';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

interface CardChoferProps {
  dominio: string;
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  tarifa: number;
  calificacion: number;
  foto: string;
  origen: string;
  destino: string;
  fecha: string;
  duracion: number;
  cantidadDePasajeros: number;
  esChofer:boolean;
}

const CardChofer: React.FC<CardChoferProps> = ({
  dominio,
  id,
  nombre,
  marca,
  modelo,
  anio,
  tarifa,
  calificacion,
  foto,
  origen,
  destino,
  fecha,
  duracion,
  cantidadDePasajeros,
  esChofer
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Confirmar_viaje', {
      state: {
        origen,
        destino,
        fecha,
        duracion,
        cantidadDePasajeros,
        chofer: { id, dominio, nombre, modelo, tarifa, calificacion, esChofer },
      },
    });
  };

  return (
    <div className="card-chofer" onClick={handleClick}>
      <Card className="card-chofer__card">
        <CardHeader
          className="card-chofer__header"
          title={
            <Box className="card-chofer__title">
              <Typography className="card-chofer__dominio">
                {dominio}
              </Typography>
              <Typography variant="body2" className="card-chofer__calificacion">
                {calificacion}
                <StarIcon />
              </Typography>
            </Box>
          }
        />
        <CardContent className="card-chofer__content">
          <Box>
            <Typography className="card-chofer__nombre">{nombre}</Typography>

            <Typography className="card-chofer__modelo">
              {marca} | {modelo} • {anio}
            </Typography>
            <Box className="card-chofer__info">
              <Typography className="card-chofer__tarifa">
                Valor <strong>${tarifa}</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            {' '}
            <Avatar src={foto} style={{ width: '5rem', height: '5rem' }} />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardChofer;
