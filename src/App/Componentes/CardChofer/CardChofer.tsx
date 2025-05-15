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
import logService from '../../Services/LogService';
import usuarioService from '../../Services/LoginService';

interface CardChoferProps {
  chofer: Chofer;
  origen: string;
  destino: string;
  fecha: string;
  duracion: number;
  cantidadDePasajeros: number;
  esChofer: boolean;
}

interface Chofer {
  dominio: string;
  id: number;
  nombreYApellido: string;
  marca: string;
  modelo: string;
  anio: number;
  importe: number;
  calificacion: number;
  foto: string;
  esChofer: boolean;
}

const CardChofer: React.FC<CardChoferProps> = ({
  chofer,
  origen,
  destino,
  fecha,
  duracion,
  cantidadDePasajeros,
}) => {
  const navigate = useNavigate();
  const userObject = usuarioService.getUsuarioLogeado();

  const registrarLogConductor = async () => {
    await logService.registrarClick(chofer.nombreYApellido, userObject);
  };

  const handleClick = async () => {
    try {
      await registrarLogConductor();
    } catch (error) {
      console.error('Error al registrar el log:', error);
    }
    navigate('/Confirmar_viaje', {
      state: {
        origen,
        destino,
        fecha,
        duracion,
        cantidadDePasajeros,
        chofer,
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
                {chofer.dominio}
              </Typography>
              <Typography variant="body2" className="card-chofer__calificacion">
                {chofer.calificacion}
                <StarIcon />
              </Typography>
            </Box>
          }
        />
        <CardContent className="card-chofer__content">
          <Box>
            <Typography className="card-chofer__nombre">
              {chofer.nombreYApellido}
            </Typography>

            <Typography className="card-chofer__modelo">
              {chofer.marca} | {chofer.modelo} • {chofer.anio}
            </Typography>
            <Box className="card-chofer__info">
              <Typography className="card-chofer__tarifa">
                Valor <strong>${chofer.importe}</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            {' '}
            <Avatar
              src={chofer.foto}
              style={{ width: '5rem', height: '5rem' }}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardChofer;
