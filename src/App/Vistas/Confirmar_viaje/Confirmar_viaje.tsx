import './ConfirmarViaje.css'
import {
  Box,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import CardComentario from '../../Componentes/Card_comentarios/Card_comentarios';

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
  return (
    <div className="confirmar-viaje">
      <Box className="confirmar-viaje__header">
        <Typography variant="h5" className="confirmar-viaje__title">
          Confirmar Viaje
        </Typography>
      </Box>

      <Grid container spacing={1}>
        {[{ label: "Origen", value: origen },
          { label: "Destino", value: destino },
          { label: "Fecha", value: fecha },
          { label: "Duración", value: duracion },
          { label: "Cantidad de Pasajeros", value: cantidadPasajeros.toString() }
        ].map((item, index) => (
          <Grid container item xs={12} key={index} justifyContent="space-between">
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
        {[{ label: "Nombre", value: chofer.nombre },
          { label: "Móvil", value: chofer.movil },
          { label: "Dominio", value: chofer.dominio },
          { label: "Calificación", value: chofer.calificacion.toString() }
        ].map((item, index) => (
          <Grid container item xs={12} key={index} justifyContent="space-between">
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

    </div>
  );
};

export default ConfirmarViaje;
