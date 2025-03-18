import {TextField,  Button,  Typography,  Box,  CircularProgress,  Snackbar,  Alert,  IconButton,  Modal,  Autocomplete,} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'  
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'
import Amigos from './amigos'
interface Usuario {
  nombre: string
  apellido: string
  telefono?: number
  saldo?: number
  amigos?: []
  precioBase?: number
  dominio?: string
  descripcion?: string
  modelo?: string
}

const DatosUsuario = () => {
  const userStorage = localStorage.getItem('usuario')
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: '',
    apellido: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [success, setSuccess] = useState(false)
  const [monto, setMonto] = useState('')
  const [openAgregarAmigoModal, setOpenAgregarAmigoModal] = useState(false) 
  const [nuevoAmigo, setNuevoAmigo] = useState('') 
  const [sugerencias, setSugerencias] = useState<string[]>([]) 

  const actualizarCampo = (tipo: keyof Usuario, value: string | number) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [tipo]: value,
    }))
  }

  const handleGuardarCambios = async () => {
    setLoading(true)
    console.log('usuario Modificado ', usuario)

    try {
      await perfilService.actualizarUsuario(userObject, usuario)
      setMensaje('Cambios guardados exitosamente.')
      setSuccess(true)
    } catch (error) {
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAgregarSaldo = async () => {
    setLoading(true)
    console.log('usuario Modificado ', monto)

    try {
      await perfilService.cargarSaldo(userObject, monto)
      setMensaje('Se cargó saldo exitosamente.')
      setSuccess(true)
      setMonto('')
    } catch (error) {
      setError('Error al cargar saldo. Por favor, inténtalo de nuevo.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAgregarAmigoModal = () => {
    setOpenAgregarAmigoModal(true)
  }

  const buscarSugerencias = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await perfilService.buscarUsuarios(query)
        setSugerencias(response)
      } catch (error) {
        console.error('Error al buscar sugerencias:', error)
        setSugerencias([])
      }
    } else {
      setSugerencias([])
    }
  }

  const handleCloseAgregarAmigoModal = () => {
    setOpenAgregarAmigoModal(false)
    setNuevoAmigo('')
  }

  const handleAgregarAmigo = async () => {
    if (!nuevoAmigo) {
      setError('Por favor, ingresa un nombre de usuario.')
      return
    }

    setLoading(true)

    try {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        amigos: [...(prevUsuario.amigos || []), nuevoAmigo],
      }))

      setMensaje('Amigo agregado exitosamente.')
      setSuccess(true)
      handleCloseAgregarAmigoModal()
    } catch (error) {
      setError('Error al agregar amigo. Por favor, inténtalo de nuevo.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchDatosUsuario = async () => {
      try {
        const response = await perfilService.dataUsuario(userObject)
        setUsuario(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDatosUsuario()
  }, [])

  return (
    <Box>
      <TextField fullWidth label="Nombre" variant="outlined" margin="normal" value={usuario.nombre} onChange={(event) => actualizarCampo('nombre', event.target.value)}/>
      <TextField fullWidth label="Apellido" variant="outlined" margin="normal" value={usuario.apellido} onChange={(event) => actualizarCampo('apellido', event.target.value)}/>
      {!esChofer && (
        <TextField fullWidth label="Teléfono" variant="outlined"  margin="normal" value={usuario.telefono ?? ''} onChange={(event) => actualizarCampo('telefono', Number(event.target.value))} />
      )}
      {esChofer && (
        <> <TextField fullWidth label="Precio base" variant="outlined" margin="normal"  value={usuario.precioBase ?? ''} onChange={(event) =>  actualizarCampo('precioBase', Number(event.target.value))} />
          <TextField fullWidth label="Dominio" variant="outlined" margin="normal" value={usuario.dominio ?? ''} onChange={(event) => actualizarCampo('dominio', event.target.value)}/>
          <TextField fullWidth label="Modelo" variant="outlined" margin="normal" value={usuario.modelo ?? ''} onChange={(event) => actualizarCampo('modelo', event.target.value)}/>
        </>
      )}
      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Agregar Saldo'}
          </Button>

          {/* Botón para agregar amigo */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <IconButton
              onClick={handleOpenAgregarAmigoModal}
              sx={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
            >
              <AddIcon />
            </IconButton>
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
            onInputChange={(event, newValue) => {
              setNuevoAmigo(newValue)
              buscarSugerencias(newValue)
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
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DatosUsuario
