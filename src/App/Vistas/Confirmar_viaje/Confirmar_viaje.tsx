import './ConfirmarViaje.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import perfilService from '../../Services/Perfil';
import { format } from 'date-fns';
import CardComentario from '../../Componentes/Card_comentarios/Card_comentarios';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

const ConfirmarViaje = () => {
  const location = useLocation();
  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage!);
  const { origen, destino, fecha, duracion, cantidadDePasajeros, chofer } =
    location.state || {};
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState<[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const calcularHoraFin = (fechaInicio: string, duracion: number) => {
    const [dia, mes, anio, hora, min] = fechaInicio.match(/\d+/g)!.map(Number);
    const fechaObj = new Date(2000 + anio, mes - 1, dia, hora, min);
    fechaObj.setMinutes(fechaObj.getMinutes() + duracion);
    const horaFin = String(fechaObj.getHours()).padStart(2, '0');
    const minFin = String(fechaObj.getMinutes()).padStart(2, '0');
    return `${horaFin}:${minFin}`;
  };

  const handleConfirmarViaje = async (fechaInicio: string) => {
    const fechaFin = calcularHoraFin(fecha, duracion);
    const fechaFormateada = fechaInicio
      ? format(new Date(fecha), 'dd/MM/yyyy HH:mm')
      : '';
    const viajedata = {
      idViajero: userObject?.id || 0,
      idConductor: chofer?.id,
      nombre: chofer?.nombre,
      origen,
      destino,
      fechaInicio: fechaFormateada,
      cantidadDePasajeros,
      duracion,
      importe: chofer?.tarifa,
      puedeCalificar: true,
      fechaFin,
    };
    try {
      await perfilService.confirmarViaje(viajedata);
      navigate('/Home');
      enqueueSnackbar("Viaje Confirmado", {
        variant: 'success',
        autoHideDuration: 1000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 1000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      });
    }
  };
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await perfilService.getComentarios(chofer);
        setComentarios(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComentarios();
  }, []);

  return (
    <div className="confirmar-viaje">
      <Typography variant="h5" className="confirmar-viaje__title">
        Confirmar Viaje
      </Typography>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Origen:
        </Typography>
        <Typography variant="body1">{origen}</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Destino:
        </Typography>
        <Typography variant="body1">{destino}</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Fecha:
        </Typography>
        <Typography variant="body1">
          {fecha ? format(new Date(fecha), 'dd/MM/yyyy HH:mm') : ''}
        </Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Duración:
        </Typography>
        <Typography variant="body1">{duracion} min</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Pasajeros:
        </Typography>
        <Typography variant="body1">{cantidadDePasajeros}</Typography>
      </Box>
      <Divider className="divider" />
      {/* Información del chofer */}
      <Typography variant="h5" className="confirmar-viaje__title">
        Chofer
      </Typography>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Nombre:
        </Typography>
        <Typography variant="body1">{chofer?.nombre}</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Móvil:
        </Typography>
        <Typography variant="body1">{chofer?.modelo}</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Dominio:
        </Typography>
        <Typography variant="body1">{chofer?.dominio}</Typography>
      </Box>
      <Box className="info-item">
        <Typography variant="body1" className="info-text">
          Calificación:
        </Typography>
        <Typography variant="body1">⭐ {chofer?.calificacion}</Typography>
      </Box>
      <Divider className="divider" />
      <Box className="comentarios-container">
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <CardComentario
              key={comentario.idComentario}
              comentario={comentario}
              onDeleteComentario={() => {}}
            />
          ))
        ) : (
          <Typography variant="body2" className="Chofer-sin-comentarios">
            Este chofer aún no tiene comentarios.
          </Typography>
        )}
      </Box>

      <Box className="confirmar-viaje__acciones">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'White',
              color: 'black',
              fontSize: '1.2rem',
              mb: 2,
              ml: 4,
            }}
            onClick={() => navigate('/home')}
          >
            Volver
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8A2BE2',
              fontSize: '1.2rem',
              mb: 2,
              ml: 14,
            }}
            onClick={handleConfirmarViaje}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ConfirmarViaje;
