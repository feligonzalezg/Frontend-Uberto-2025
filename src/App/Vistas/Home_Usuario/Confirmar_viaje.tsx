import React from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import CardComentario from './../../Componentes/Card_comentarios/Card_comentarios';

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
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f0eff2",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: "start",
          color: "#5508a7",
          fontWeight: "bold",
        }}
      >
        Confirmar Viaje
      </Typography>

      <Grid container spacing={1}>
        {[
          { label: "Origen", value: origen },
          { label: "Destino", value: destino },
          { label: "Fecha", value: fecha },
          { label: "Duración", value: duracion },
          { label: "Cantidad de Pasajeros", value: cantidadPasajeros.toString() },
        ].map((item, index) => (
          <Grid container item xs={12} key={index} justifyContent="space-between">
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
              {item.label}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "right" }}>
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2, backgroundColor: "#5508a7" }} />

      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: "start",
          color: "#5508a7",
          fontWeight: "bold",
        }}
      >
        Chofer Premium
      </Typography>

      <Grid container spacing={1}>
        {[
          { label: "Nombre", value: chofer.nombre },
          { label: "Móvil", value: chofer.movil },
          { label: "Dominio", value: chofer.dominio },
          { label: "Calificación", value: chofer.calificacion.toString() },
        ].map((item, index) => (
          <Grid container item xs={12} key={index} justifyContent="space-between">
            <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "left" }}>
              {item.label}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "right" }}>
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2, backgroundColor: "#5508a7" }} />

      <CardComentario
        nombre="Blas Armando Giunta"
        fecha="1/1/2000"
        foto="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
        puntuacion={4}
        comentario="lindo viaje"
      />

      <CardComentario
        nombre="Blas Armando Giunta"
        fecha="1/1/2000"
        foto="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
        puntuacion={4}
        comentario="lindo viaje"
      />
    </Box>
  );
};

export default ConfirmarViaje;
