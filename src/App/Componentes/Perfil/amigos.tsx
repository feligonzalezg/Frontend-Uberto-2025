import { Box, Typography, Avatar, IconButton, Modal, Button, CircularProgress, Alert, Snackbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import perfilService from '../../Services/Perfil'
import { AxiosError } from 'axios'

interface Amigo {
  nombreYApellido: string
  username: string
  avatar: string
  id: number
}

const Amigos = ({ amigos }: { amigos: Amigo[] }) => {
  const [openModal, setOpenModal] = useState(false)
  const [amigoToDelete, setAmigoToDelete] = useState<Amigo | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = (amigo: Amigo) => {
    setAmigoToDelete(amigo)
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    setOpenModal(false)
    setAmigoToDelete(null)
  };

const obtenerUsuario = () => {
  try {
    const userString = localStorage.getItem('usuario')
    if (!userString) {
      throw new Error('Usuario no encontrado en el localStorage')
    }
    const userObject = JSON.parse(userString)
    return userObject
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message || 'Error al eliminar el amigo. Por favor, inténtalo de nuevo.')
    } else {
      setError('Error al eliminar el amigo. Por favor, inténtalo de nuevo.')
    }
  }
};
  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      if (!amigoToDelete) {
        throw new Error('No se ha seleccionado un amigo para eliminar.')
      }
      
      console.log('Eliminando amigo:', amigoToDelete.username)
      const userObject = obtenerUsuario()
      console.log("mi id=",userObject.id)
      console.log("amigoToDelete.id=",amigoToDelete.id)
      await perfilService.eliminarAmigo(userObject.id,amigoToDelete.id)
  
      // Mostrar mensaje de éxito
      setMensaje(`${amigoToDelete.nombreYApellido} fue eliminado exitosamente.`)
      setSuccess(true)
      handleCloseModal()
    } catch (e: unknown) {
      // Manejar el error de Axios
      if (e instanceof AxiosError) {
        if (e.response?.status === 500 && e.response.data.message) {
          setError(e.response.data.message); // Mostrar el mensaje del servidor
        } else {
          setError('Error al eliminar el amigo. Por favor, inténtalo de nuevo.')
        }
      } else {
        // Manejar otros errores (no relacionados con Axios)
        const err = e as Error;
        setError(err.message || 'Ocurrió un error inesperado.')
      }
      console.error(e)
    } finally {
      setLoading(false)
    }
  };
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Amigos
      </Typography>

      {amigos.map((amigo, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
            borderBottom: '1px solid #ccc',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={amigo.avatar}
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {amigo.nombreYApellido}
              </Typography>
              <Typography variant="body1">{amigo.username}</Typography>
            </Box>
          </Box>
          <IconButton onClick={() => handleOpenModal(amigo)}>
            <DeleteIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />
          </IconButton>
        </Box>
      ))}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
          <Typography id="modal-title" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
            ¿Estás seguro de eliminar a {amigoToDelete?.nombreYApellido}?
          </Typography>
          <Typography id="modal-description" variant="body1" sx={{ marginBottom: 3 }}>
            Esta acción no se puede deshacer.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              {loading ? <CircularProgress size={24} /> : 'Eliminar'}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={success || !!error}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(false);
          setError('');
        }}
      >
        <Alert
          severity={success ? 'success' : 'error'}
          onClose={() => {
            setSuccess(false);
            setError('');
          }}
        >
          {success ? mensaje : error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Amigos;