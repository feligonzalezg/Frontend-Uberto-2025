import './ConfirmarViaje.css';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import perfilService from '../../Services/Perfil';
import { format } from 'date-fns';
import CardComentario from '../../Componentes/Card_comentarios/Card_comentarios';
import { useEffect, useState } from 'react';

const ConfirmarViaje = () => {
  const location = useLocation();
  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage!);
  const { origen, destino, fecha, duracion, cantidadPasajeros, chofer } =
    location.state || {};
  const navigate = useNavigate();
  const [comentarios, setComentarios] = useState<[]>([]);

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
      cantidadPasajeros,
      duracion,
      importe: chofer?.tarifa,
      puedeCalificar: true,
      fechaFin,
    };
    try {
      console.log('antes de ir al service', viajedata);
      await perfilService.confirmarViaje(viajedata);
      navigate('/Home');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await perfilService.getComentariosChofer(chofer);
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
        <Typography variant="body1">{fecha}</Typography>
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
        <Typography variant="body1">{cantidadPasajeros}</Typography>
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
        <Typography variant="body1">{chofer?.patente}</Typography>
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
          <Typography variant="body2">
            Este chofer aún no tiene comentarios.
          </Typography>
        )}
      </Box>

      <Box className="confirmar-viaje__acciones">
        <Button className="boton-volver" onClick={() => navigate('/home')}>
          Volver
        </Button>
        <Button className="boton-confirmar" onClick={handleConfirmarViaje}>
          Confirmar
        </Button>
      </Box>
    </div>
  );
};

export default ConfirmarViaje;
