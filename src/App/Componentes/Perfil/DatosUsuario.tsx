import { InputLabel , MenuItem, FormControl, Select, TextField, Button, Typography, Box, CircularProgress, Snackbar, Alert, IconButton, Modal, Autocomplete } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import perfilService from '../../Services/Perfil';
import Amigos from './amigos';

interface Usuario {
  nombre: string;
  apellido: string;
  telefono?: number;
  saldo?: number;
  amigos?: Amigo[];
  precioBase?: number;
  tipo?: string | number;
  anio?: number | string;
  dominio?: string;
  marca?: string;
  modelo?: string;
}


interface Amigo {
  nombreYApellido: string
  username: string
  avatar: string
  id: number
}

const DatosUsuario = ({setImage}) => {

  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage!);
  const esChofer = userObject.esChofer;
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: '',
    apellido: '',
  });
  
  const [usuarioOriginal, setUsuarioOriginal] = useState<Usuario>({
    nombre: '',
    apellido: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [success, setSuccess] = useState(false);
  const [monto, setMonto] = useState('');
  const [openAgregarAmigoModal, setOpenAgregarAmigoModal] = useState(false);
  const [nuevoAmigo, setNuevoAmigo] = useState<Amigo | null>();
  const [sugerencias, setSugerencias] = useState<[]>([]);

  const actualizarCampo = (tipo: keyof Usuario, value: string | number) => {
    if (tipo === 'tipo') {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [tipo]: value,
        dominio : "",
        modelo:"",
        marca:"",
        anio:""
      }));
      
    } 
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [tipo]: value,
    }));
  };

  const handleGuardarCambios = async () => {
    
    if (JSON.stringify(usuario) === JSON.stringify(usuarioOriginal)) {
      setError('No hay cambios para guardar.');
      return;
    }

    setLoading(true);
    console.log('usuario Modificado ', usuario);

    try {
      await perfilService.actualizarUsuario(userObject, usuario);
      setMensaje('Cambios guardados exitosamente.');
      setSuccess(true);
      
      setUsuarioOriginal(usuario);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarSaldo = async () => {
    
    console.log('usuario Modificado ', monto);
    
    if(monto == ''){
      setError('Ingrese un valor numerico mayor a 1000');
      return;
    }

    setLoading(true);
    try {
      await perfilService.cargarSaldo(userObject, monto);
      setMensaje('Se cargó saldo exitosamente.');
      setSuccess(true);
      setMonto('');
    } catch (error) {
      setError('Error al cargar saldo. Por favor, inténtalo de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAgregarAmigoModal = () => {
    setOpenAgregarAmigoModal(true);
  };

  const buscarSugerencias = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await perfilService.buscarUsuarios(query, userObject.id)
        setSugerencias(response);
      } catch (error) {
        console.error('Error al buscar sugerencias:', error);
        setSugerencias([]);
      }
    } else {
      setSugerencias([]);
    }
  };

  const handleCloseAgregarAmigoModal = () => {
    setOpenAgregarAmigoModal(false);
    setNuevoAmigo(null);
  };

  const handleAgregarAmigo = async () => {
    console.log("hola " + nuevoAmigo?.id)
    if (!nuevoAmigo) {
      setError('Por favor, ingresa un nombre de usuario.');
      return;
    }

    setLoading(true);

    try {
      await perfilService.agregarAmigo(userObject.id, nuevoAmigo.id)
      setMensaje('Amigo agregado exitosamente.');
      setSuccess(true);
      handleCloseAgregarAmigoModal();
    } catch (error) {
      setError('Error al agregar amigo. Por favor, inténtalo de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDatosUsuario = async () => {
      try {
        const response = await perfilService.dataUsuario(userObject);
        setUsuario(response);
        setImage(response.foto)
        setUsuarioOriginal(response); 

      } catch (error) {
        console.error(error);
      }
    };

    fetchDatosUsuario();
  }, []);

  return (
    <Box>
      <TextField fullWidth label="Nombre" variant="outlined" margin="normal" value={usuario.nombre} onChange={(event) => actualizarCampo('nombre', event.target.value)} />
      <TextField fullWidth label="Apellido" variant="outlined" margin="normal" value={usuario.apellido} onChange={(event) => actualizarCampo('apellido', event.target.value)} />
      {!esChofer && (
        <TextField fullWidth label="Teléfono" variant="outlined" margin="normal" value={usuario.telefono ?? ''} onChange={(event) => actualizarCampo('telefono', Number(event.target.value))} />
      )}
      {esChofer && (<>
        <TextField fullWidth label="Precio base" variant="outlined" margin="normal" value={usuario.precioBase ?? ''} onChange={(event) => actualizarCampo('precioBase', Number(event.target.value))} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Informacion Vehiculo
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="tipo-vehiculo-label">Tipo de Vehículo</InputLabel>
      <Select
        labelId="tipo-vehiculo-label"
        id="tipo-vehiculo"
        value={usuario.tipo ?? ''}
        onChange={(event) => actualizarCampo('tipo', event.target.value)}
        label="Tipo de Vehículo"
        aria-placeholder='seleccione un tipo de vehiculo'
      >
        <MenuItem value="Simple">Auto</MenuItem>
        <MenuItem value="Ejecutivo">Auto Ejecutivo</MenuItem>
        <MenuItem value="Moto">Moto</MenuItem>
      </Select>
    </FormControl>
            <TextField fullWidth label="Año" variant="outlined" margin="normal" value={usuario.anio ?? ''} onChange={(event) => actualizarCampo('anio', event.target.value)} />
        <TextField fullWidth label="Dominio" variant="outlined" margin="normal" value={usuario.dominio ?? ''} onChange={(event) => actualizarCampo('dominio', event.target.value)} />
        <TextField fullWidth label="Marca" variant="outlined" margin="normal" value={usuario.marca ?? ''} onChange={(event) => actualizarCampo('marca', event.target.value)} />
        <TextField fullWidth label="Modelo" variant="outlined" margin="normal" value={usuario.modelo ?? ''} sx={{mb:2}} onChange={(event) => actualizarCampo('modelo', event.target.value)} />
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

      {!esChofer && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Saldo Disponible: {usuario.saldo ?? ''}
          </Typography>
          <TextField
            fullWidth
            label="Monto"
            type="number"
            variant="outlined"
            margin="normal"
            value={monto}
            onChange={(event) => setMonto(event.target.value)}
          />

<Button
            className="button-primary"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: 'purple' }}
            onClick={handleAgregarSaldo}
            disabled={loading || !monto} 
          >
            {loading ? <CircularProgress size={24} /> : 'Agregar Saldo'}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '2em' }}>
            <Typography variant="h5" fontWeight="bold">
              Amigos
            </Typography>
            <Box>
              <IconButton
                onClick={handleOpenAgregarAmigoModal}
                sx={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {usuario.amigos && <Amigos amigos={usuario.amigos} />}
        </>
      )}

      {/* Modal para agregar amigo */}
      <Modal
        open={openAgregarAmigoModal}
        onClose={handleCloseAgregarAmigoModal}
        aria-labelledby="modal-agregar-amigo"
        aria-describedby="modal-agregar-amigo-desc"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Agregar Amigo
          </Typography>
          <Autocomplete
            freeSolo
            options={sugerencias}
            getOptionLabel={(option: Amigo | string) => typeof option === "string" ? option : `${option.username} - ${option.nombreYApellido}`}
            onChange={(_, newValue) => {
              if (newValue !== null && typeof newValue !== 'string') {
                setNuevoAmigo(newValue);
              }
            }}
            onInputChange={(_, newValue) => {
              //setNuevoAmigo(newValue);
              buscarSugerencias(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Nombre de usuario"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
          >
            <Button variant="outlined" onClick={handleCloseAgregarAmigoModal}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleAgregarAmigo}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Agregar'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar para mensajes de éxito y error */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DatosUsuario;