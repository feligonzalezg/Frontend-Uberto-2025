import { Box, Typography, Avatar, IconButton, Modal, Button,CircularProgress, Alert ,Snackbar} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

interface Amigo {
  nombreYApellido: string
  username: string
  avatar: string
}

const Amigos = ({ amigos }: { amigos: Amigo[] }) => {
  const [openModal, setOpenModal] = useState(false) 
  const [amigoToDelete, setAmigoToDelete] = useState<Amigo>() 
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

  const handleConfirmDelete = () => {
    try {
      console.log('Eliminando amigo:', amigoToDelete?.username)
      // await perfilService.actualizarUsuario(userObject.id, usuario)
      setMensaje(`${amigoToDelete?.nombreYApellido} fue eliminado exitosamente.`);     
       setSuccess(true)
      handleCloseModal() 
     } catch (error) {
       setError("Error al guardar los cambios. Por favor, inténtalo de nuevo.")
       console.error(error)
     } finally {
       setLoading(false)
     }
   }

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
            {loading ? <CircularProgress size={24} /> : "Eliminar"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
      open={success || !!error} // Se abre si hay éxito o error
      autoHideDuration={6000} // Duración de 6 segundos
      onClose={() => {
        setSuccess(false); 
        setError(''); 
      }}
    >
      <Alert
        severity={success ? "success" : "error"} // Tipo de alerta (éxito o error)
        onClose={() => {
          setSuccess(false); 
          setError(''); 
        }}
      >
        {success ? mensaje : error} 
      </Alert>
    </Snackbar>
    </Box>
  )
}

export default Amigos