import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Modal,
  Autocomplete,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import perfilService from '../../Services/Perfil';
import Amigos from './amigos';
import usuarioService from '../../Services/LoginService';
import FormularioUsuario from './formularioUsuarios';
import SaldoUsuario from './SaldoUsuario';

interface Usuario {
  nombre: string;
  apellido: string;
  telefono?: number;
  saldo?: number;
  amigos?: Amigo[];
  precioBase?: number;
  anio?: number | string;
  dominio?: string;
  marca?: string;
  modelo?: string;
}

interface Amigo {
  nombreYApellido: string;
  username: string;
  avatar: string;
  id: number;
}

const DatosUsuario = ({ setImage }) => {
  const userObject = usuarioService.getUsuarioLogeado();
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
  const [amigos, setAmigos] = useState<Amigo[] | null>([]);
  const [nuevoAmigo, setNuevoAmigo] = useState<Amigo | null>();
  const [sugerencias, setSugerencias] = useState<[]>([]);

  const actualizarCampo = (tipo: keyof Usuario, value: string | number) => {
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

    try {
      await perfilService.actualizarUsuario(userObject, usuario);
      setMensaje('Cambios guardados exitosamente.');
      setSuccess(true);

      setUsuarioOriginal(usuario);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarSaldo = async () => {
    if (monto == '') {
      setError('Ingrese un valor numerico mayor a 1000');
      return;
    }

    setLoading(true);
    try {
      await perfilService.cargarSaldo(userObject, monto);
      setMensaje('Se cargó saldo exitosamente.');
      setSuccess(true);
      setMonto('');
      fetchDatosUsuario();
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
        const response = await perfilService.buscarUsuarios(
          query,
          userObject.id
        );
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
    if (!nuevoAmigo) {
      setError('Por favor, ingresa un nombre de usuario.');
      return;
    }
    setLoading(true);
    try {
      const amigoNuevo = await perfilService.agregarAmigo(
        userObject.id,
        nuevoAmigo.id
      );
      setMensaje('Amigo agregado exitosamente.');
      setSuccess(true);
      setAmigos((prevAmigos) => [...prevAmigos, amigoNuevo]);
      handleCloseAgregarAmigoModal();
    } catch (error) {
      setError('Error al agregar amigo. Por favor, inténtalo de nuevo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeAmigo = (id: number) => {
    setAmigos(amigos!!.filter((amigo) => amigo.id !== id));
  };

  const fetchDatosUsuario = async () => {
    try {
      const response = await perfilService.dataUsuario(userObject);
      setUsuario(response);
      setImage(response.foto);
      setUsuarioOriginal(response);
      setAmigos(response.amigos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatosUsuario();
  }, []);

  return (
    <Box>
      <Box>
        <FormularioUsuario
          usuario={usuario}
          esChofer={esChofer}
          loading={loading}
          actualizarCampo={actualizarCampo}
          handleGuardarCambios={handleGuardarCambios}
        />
      </Box>

      {!esChofer && (
        <>
          <SaldoUsuario
            saldo={usuario.saldo ?? 0}
            monto={monto}
            setMonto={setMonto}
            handleAgregarSaldo={handleAgregarSaldo}
            loading={loading}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: '2em',
            }}
          >
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

          {usuario.amigos && (
            <Amigos amigos={amigos} handleAmigoToDelete={removeAmigo} />
          )}
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
            getOptionLabel={(option: Amigo | string) =>
              typeof option === 'string'
                ? option
                : `${option.username} - ${option.nombreYApellido}`
            }
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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={() => setError('')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DatosUsuario;
