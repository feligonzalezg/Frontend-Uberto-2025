import { TextField, Button, Typography, Box } from '@mui/material'

const DatosUsuario = () => {
  return (
    <Box>
      <TextField fullWidth label="Nombre" variant="outlined" margin="normal" />
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Teléfono"
        variant="outlined"
        margin="normal"
      />

      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Guardar Cambios
      </Button>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Saldo Disponible: $300.000
      </Typography>
      <TextField
        fullWidth
        label="Monto"
        type="number"
        variant="outlined"
        margin="normal"
      />

      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: 'purple' }}
      >
        Agregar Saldo
      </Button>
    </Box>
  )
}

export default DatosUsuario
