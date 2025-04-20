import { TextField, Typography, Button, CircularProgress } from '@mui/material';

interface FormularioUsuarioProps {
  usuario: any;
  esChofer: boolean;
  loading: boolean;
  actualizarCampo: (campo: string, valor: any) => void;
  handleGuardarCambios: () => void;
}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({
  usuario,
  esChofer,
  loading,
  actualizarCampo,
  handleGuardarCambios,
}) => {
  return (
    <>
      <TextField
        fullWidth
        label="Nombre"
        variant="outlined"
        margin="normal"
        value={usuario.nombre}
        onChange={(event) => actualizarCampo('nombre', event.target.value)}
      />
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        margin="normal"
        value={usuario.apellido}
        onChange={(event) => actualizarCampo('apellido', event.target.value)}
      />
      {!esChofer && (
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          value={usuario.telefono ?? ''}
          onChange={(event) => {
            const number = event.target.value;
            if (/^\d*$/.test(number) && number.length <= 9) {
              actualizarCampo('telefono', Number(number));
            }
          }}
        />
      )}
      {esChofer && (
        <>
          <TextField
            fullWidth
            label="Precio base"
            variant="outlined"
            margin="normal"
            value={usuario.precioBase ?? ''}
            onChange={(event) =>
              actualizarCampo('precioBase', Number(event.target.value))
            }
          />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Informacion Vehiculo
          </Typography>
          <TextField
            fullWidth
            label="Año"
            variant="outlined"
            margin="normal"
            value={usuario.anio ?? ''}
            onChange={(event) => actualizarCampo('anio', event.target.value)}
          />
          <TextField
            fullWidth
            label="Dominio"
            variant="outlined"
            margin="normal"
            value={usuario.dominio ?? ''}
            onChange={(event) => actualizarCampo('dominio', event.target.value)}
          />
          <TextField
            fullWidth
            label="Marca"
            variant="outlined"
            margin="normal"
            value={usuario.marca ?? ''}
            onChange={(event) => actualizarCampo('marca', event.target.value)}
          />
          <TextField
            fullWidth
            label="Modelo"
            variant="outlined"
            margin="normal"
            value={usuario.modelo ?? ''}
            sx={{ mb: 2 }}
            onChange={(event) => actualizarCampo('modelo', event.target.value)}
          />
        </>
      )}
      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        onClick={handleGuardarCambios}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
      </Button>
    </>
  );
};

export default FormularioUsuario;
