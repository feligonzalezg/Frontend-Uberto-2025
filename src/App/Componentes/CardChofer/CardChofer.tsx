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
  id: number;
  patente: string;
  nombre: string;
  modelo: string;
  tarifa: number;
  calificacion: number;
  origen: string;
  destino: string;
  fecha: string;
  duracion: number;
  cantidadPasajeros: number;
}

const CardChofer: React.FC<CardChoferProps> = ({
  id,
  patente,
  nombre,
  modelo,
  tarifa,
  calificacion,
  origen,
  destino,
  fecha,
  duracion,
  cantidadPasajeros,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Confirmar_viaje', {
      state: {
        origen,
        destino,
        fecha,
        duracion,
        cantidadPasajeros,
        chofer: { id, patente, nombre, modelo, tarifa, calificacion },
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
              <Typography className="card-chofer__patente">
                {patente}
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
            <Typography className="card-chofer__modelo">{modelo}</Typography>
            <Box className="card-chofer__info">
              <Typography className="card-chofer__tarifa">
                Valor <strong>${tarifa}</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            {' '}
            <Avatar style={{ width: '5rem', height: '5rem' }} />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardChofer;
