import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Rating,
  Stack,
} from "@mui/material";

interface CalificarViajeModalProps {
  open: boolean; 
  onClose: () => void; 
  onCalificar: (calificacion: {
    estrellas: number;
    comentario: string;
    fecha: string;
  }) => void;
}

const CalificarViajeModal: React.FC<CalificarViajeModalProps> = ({
  open,
  onClose,
  onCalificar,
}) => {

  const [estrellas, setEstrellas] = useState<number | null>(null);
  const [comentario, setComentario] = useState<string>("");

  const handleSubmit = () => {
    if (estrellas === null) {
      alert("Por favor, selecciona una calificación de estrellas.");
      return;
    }

    const fechaActual = new Date().toISOString().split("T")[0];
    onCalificar({
      estrellas,
      comentario,
      fecha: fechaActual,
    });
    setEstrellas(null);
    setComentario("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Calificar Viaje
        </Typography>

    
        <Stack spacing={1} sx={{ marginBottom: 2 }}>
          <Rating
            name="calificacion-estrellas"
            value={estrellas}
            onChange={(event, newValue) => setEstrellas(newValue)}
            sx={{
              fontSize: "4rem"
            }}
          />
        </Stack>

     
        <TextField
          label="Comentario"
          multiline
          rows={4}
          fullWidth
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Enviar Calificación
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalificarViajeModal;