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
  idViaje: number;
  onCalificar: (calificacion: {
    idViaje: number;
    estrellas: number;
    mensaje: string;
  }) => void;
}

const CalificarViajeModal: React.FC<CalificarViajeModalProps> = ({
  open,
  onClose,
  idViaje,
  onCalificar,
}) => {

  const [estrellas, setEstrellas] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string>("");

  const isFormValid = estrellas != null && mensaje.trim() !== "";

  const handleSubmit = () => {

    onCalificar({
      idViaje,
      estrellas,
      mensaje: mensaje,
    });
    
    setEstrellas(null);
    setMensaje("");
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
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}disabled={!isFormValid}>
            Enviar Calificación
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalificarViajeModal;