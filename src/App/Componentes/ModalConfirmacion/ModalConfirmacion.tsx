// src/components/ModalConfirmacion.tsx
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'

interface ModalConfirmacionProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  loading?: boolean
  confirmText?: string
  cancelText?: string
  confirmColor?: 'error' | 'primary' | 'success'
}

const ModalConfirmacion = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  loading = false,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'primary',
}: ModalConfirmacionProps) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="contained" color={confirmColor} onClick={onConfirm}>
            {loading ? <CircularProgress size={24} /> : confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalConfirmacion
