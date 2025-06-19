import { Box, Typography, Avatar, IconButton, Modal, Button, CircularProgress, Alert, Snackbar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import perfilService from '../../Services/Perfil'
import { AxiosError } from 'axios'
import usuarioService from '../../Services/LoginService'
import ModalConfirmacion from '../ModalConfirmacion/ModalConfirmacion'

interface Amigo {
  nombreYApellido: string
  username: string
  avatar: string
  id: number
  foto: string
}

type AmigosProps = {
  amigos: Amigo[],
  handleAmigoToDelete: (id: number) => void
}

const Amigos = ({ amigos, handleAmigoToDelete }: AmigosProps ) => {
  const [openModal, setOpenModal] = useState(false)
  const [amigoToDelete, setAmigoToDelete] = useState<Amigo | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = (amigo: Amigo) => {
    setAmigoToDelete(amigo)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAmigoToDelete(null)
  }

  const obtenerUsuario = () => {
    try {
      const userString = usuarioService.getUsuarioLogeado()
      if (!userString) throw new Error('Usuario no encontrado en el localStorage')
      return userString
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el amigo. Por favor, inténtalo de nuevo.'
      setError(errorMessage)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      if (!amigoToDelete) throw new Error('No se ha seleccionado un amigo para eliminar.')

      const userObject = obtenerUsuario()
      await perfilService.eliminarAmigo(userObject, amigoToDelete.id)
      handleAmigoToDelete(amigoToDelete.id)
      setMensaje(`${amigoToDelete.nombreYApellido} fue eliminado exitosamente.`)
      setSuccess(true)
      handleCloseModal()
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message || 'Error al eliminar el amigo. Por favor, inténtalo de nuevo.')
      } else {
        const err = e as Error
        setError(err.message || 'Ocurrió un error inesperado.')
      }
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ marginTop: 3 }}>

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
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar src={amigo.foto} sx={{ width: 56, height: 56, marginRight: 2 }} />
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

    <ModalConfirmacion
  open={openModal}
  onClose={handleCloseModal}
  onConfirm={handleConfirmDelete}
  title={`¿Estás seguro de eliminar a ${amigoToDelete?.nombreYApellido}?`}
  description="Esta acción no se puede deshacer."
  confirmText="Eliminar"
  loading={loading}
/>


    <Snackbar
  open={success || !!error}
  autoHideDuration={6000}
  onClose={() => {
    setSuccess(false)
    setError('')
  }}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
>
  <Alert
    severity={success ? 'success' : 'error'}
    onClose={() => {
      setSuccess(false)
      setError('')
    }}
  >
    {success ? mensaje : error}
  </Alert>
</Snackbar>
    </Box>
  )
}

export default Amigos