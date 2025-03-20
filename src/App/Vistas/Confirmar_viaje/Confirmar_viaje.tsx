import './ConfirmarViaje.css';
import { Box, Typography, Divider, Grid, Button } from '@mui/material';
import CardComentario from '../../Componentes/Card_comentarios/Card_comentarios';
import { useNavigate } from 'react-router-dom';

interface ConfirmarViajeProps {
  origen: string;
  destino: string;
  fecha: string;
  duracion: string;
  cantidadPasajeros: number;
  chofer: {
    nombre: string;
    movil: string;
    dominio: string;
    calificacion: number;
  };
}

const ConfirmarViaje = ({
  origen,
  destino,
  fecha,
  duracion,
  cantidadPasajeros,
  chofer,
}: ConfirmarViajeProps) => {
  const navigate = useNavigate();
  return (
    <div className="confirmar-viaje">
      <Box className="confirmar-viaje__header">
        <Typography variant="h5" className="confirmar-viaje__title">
          Confirmar Viaje
        </Typography>
      </Box>

      <Grid container spacing={1}>
        {[
          { label: 'Origen', value: origen },
          { label: 'Destino', value: destino },
          { label: 'Fecha', value: fecha },
          { label: 'Duración', value: duracion },
          {
            label: 'Cantidad de Pasajeros',
            value: cantidadPasajeros.toString(),
          },
        ].map((item, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            justifyContent="space-between"
          >
            <Typography variant="body1" className="confirmar-viaje__label">
              {item.label}
            </Typography>
            <Typography variant="body1" className="confirmar-viaje__value">
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider className="divider" />

      <Box className="chofer-info">
        <Typography variant="h5" className="chofer-info__title">
          Chofer Premium
        </Typography>
      </Box>

      <Grid container spacing={1}>
        {[
          { label: 'Nombre', value: chofer.nombre },
          { label: 'Móvil', value: chofer.movil },
          { label: 'Dominio', value: chofer.dominio },
          { label: 'Calificación', value: chofer.calificacion.toString() },
        ].map((item, index) => (
          <Grid
            container
            item
            xs={12}
            key={index}
            justifyContent="space-between"
          >
            <Typography variant="body1" className="chofer-info__label">
              {item.label}
            </Typography>
            <Typography variant="body1" className="chofer-info__value">
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider className="divider" />

      <Box className="comentarios">
        <CardComentario
          nombre="Blas Armando Giunta"
          fecha="1/1/2000"
          puntuacion={4}
          comentario="Re lindo el viaje pero es la primera vez que lo escucho que los jugadores se quieren ir de Boca. Tanto yo como todos los compañeros que tuve si podemos nos quedabamos para siempre en Boca. Unicamente te vas a Europa si te dicen de pasar al Manchester United a Juventus, Real madrid, Barcelona, despues viene Boca es lo mas grande"
        />
        <CardComentario
          nombre="Blas Armando Giunta"
          fecha="1/1/2000"
          puntuacion={4}
          comentario="Re lindo el viaje pero es la primera vez que lo escucho que los jugadores se quieren ir de Boca. Tanto yo como todos los compañeros que tuve si podemos nos quedabamos para siempre en Boca. Unicamente te vas a Europa si te dicen de pasar al Manchester United a Juventus, Real madrid, Barcelona, despues viene Boca es lo mas grande"
        />
      </Box>

      <Box className="confirmar-viaje__acciones">
        <Button className="boton-volver" onClick={() => navigate('/home')}>
          Volver
        </Button>
        <Button
          className="boton-confirmar"
          onClick={() => alert('Viaje confirmado')}
        >
          Confirmar
        </Button>
      </Box>
    </div>
  );
};

export default ConfirmarViaje;
