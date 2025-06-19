import { Box, Typography, Avatar, IconButton, Snackbar, Alert } from '@mui/material'
import AddIcon from '@mui/icons-material/PersonAdd'
import { useState } from 'react'
import ModalConfirmacion from '../ModalConfirmacion/ModalConfirmacion'

interface Amigo {
  nombreYApellido: string
  username: string
  avatar: string
  id: number
  foto: string
}

type SugerenciasProps = {
  sugeridos: Amigo[]
  handleAgregarAmigo: (amigo: Amigo) => void
}

const Sugerencias = ({ sugeridos, handleAgregarAmigo }: SugerenciasProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [amigoSeleccionado, setAmigoSeleccionado] = useState<Amigo | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [success, setSuccess] = useState(false)

  const handleOpenModal = (amigo: Amigo) => {
    setAmigoSeleccionado(amigo)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setAmigoSeleccionado(null)
  }

  const handleConfirmAgregar = () => {
    if (amigoSeleccionado) {
      handleAgregarAmigo(amigoSeleccionado)
      setMensaje(`${amigoSeleccionado.nombreYApellido} fue agregado exitosamente.`)
      setSuccess(true)
      handleCloseModal()
    }
  }

  return (
    <Box sx={{ marginTop: 3 }}>
      {sugeridos.map((sugerido, index) => (
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
            <Avatar src={sugerido.foto} sx={{ width: 56, height: 56, marginRight: 2 }} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {sugerido.nombreYApellido}
              </Typography>
              <Typography variant="body1">{sugerido.username}</Typography>
            </Box>
          </Box>
          <IconButton onClick={() => handleOpenModal(sugerido)}>
            <AddIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />
          </IconButton>
        </Box>
      ))}

      <ModalConfirmacion
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAgregar}
        title={`¿Agregar a ${amigoSeleccionado?.nombreYApellido}?`}
        description="Se agregará a tu lista de amigos"
        confirmText="Agregar"
        confirmColor="success"
      />

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Sugerencias
