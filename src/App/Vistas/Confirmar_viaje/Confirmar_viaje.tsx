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

const ConfirmarViaje: React.FC<ConfirmarViajeProps> = ({
  origen,
  destino,
  fecha,
  duracion,
  cantidadPasajeros,
  chofer,
}) => {
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

      <Box className="comentarios">
        <CardComentario
          nombre="Blas Armando Giunta"
          fecha="1/1/2000"
          foto="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
          puntuacion={4}
          comentario="Re lindo el viaje pero es la primera vez que lo escucho que los jugadores se quieren ir de Boca. Tanto yo como todos los compañeros que tuve si podemos nos quedabamos para siempre en Boca. Unicamente te vas a Europa si te dicen de pasar al Manchester United a Juventus, Real madrid, Barcelona, despues viene Boca es lo mas grande"
        />
        <CardComentario
          nombre="Blas Armando Giunta"
          fecha="1/1/2000"
          foto="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
          puntuacion={4}
          comentario="Re lindo el viaje pero es la primera vez que lo escucho que los jugadores se quieren ir de Boca. Tanto yo como todos los compañeros que tuve si podemos nos quedabamos para siempre en Boca. Unicamente te vas a Europa si te dicen de pasar al Manchester United a Juventus, Real madrid, Barcelona, despues viene Boca es lo mas grande"
        />
      </Box>
    </div>
  );
};

export default ConfirmarViaje;
