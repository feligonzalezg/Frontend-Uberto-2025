import './CardComentario.css';
import { Card, CardHeader, CardContent, Avatar, Typography, Box, IconButton, Modal, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react';
import { AxiosError } from 'axios';
import perfilService from '../../Services/Perfil';

interface Comentario {
  idComentario:number,
  nombre: string,
  fecha: string,
  estrellas: number,
  mensaje: string
}

type CardComentarioProps = {
  comentario: Comentario,
  onDeleteComentario: (idComentario: number) => void
}

  const CardComentario = ({ comentario, onDeleteComentario }: CardComentarioProps & { onDeleteComentario: (idComentario: number) => void }) => {
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!)
  const esChofer = userObject.esChofer
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [comentarioToDelete, setComentarioToDelete] = useState<Comentario | null>(null)

  const handleOpenModal = (comentario: Comentario) => {
    setComentarioToDelete(comentario)
    setOpenModal(true)
    console.log(comentario)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setComentarioToDelete(null)
  }

  const handleConfirmDelete = async () => {
    try{
      setLoading(true)
      if (!comentarioToDelete) throw new Error('No se ha seleccionado un comentario para eliminar.')
      console.log('Eliminando comentario...')
      await perfilService.deleteComentario(userObject.id, comentarioToDelete.idComentario)
      setMensaje(`El comentario fue eliminado exitosamente.`)
      setSuccess(true)
      onDeleteComentario(comentarioToDelete.idComentario)
      handleCloseModal()
    } catch (e) {
          if (e instanceof AxiosError) {
            setError(e.response?.data.message || 'Error al eliminar el comentario. Por favor, inténtalo de nuevo.')
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
    <Box className="card-comentario">
      <Card className="card-comentario__card">
        <CardHeader
          className="card-comentario__header"
          avatar={<Avatar src={comentario.foto} alt={comentario.nombre} className="card-comentario__avatar" />}
          title={
            <Box className="card-comentario__header-content">
              <Typography variant="h6" className="card-comentario__name" sx={{fontWeight: "bold"}}> {comentario.nombre}</Typography>
              <Typography variant="body2" className="card-comentario__date">{comentario.fecha}</Typography>
            </Box>
          }
          action={
            <Box className="card-comentario__rating">
              <Typography variant="body2" className="card-comentario__rating-text">
                {comentario.estrellas}
              </Typography>
              <StarIcon className="card-comentario__star-icon" />
              {window.location.pathname == "/Perfil_Usuario" && !esChofer &&(
                <IconButton onClick={() => handleOpenModal(comentario)}>
                  <DeleteIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />
                </IconButton>
              )}
            </Box>
          }
        />
        <CardContent className="card-comentario__content">
          <Typography variant="body1">{comentario.mensaje}</Typography>
        </CardContent>
      </Card>

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
            ¿Estás seguro de eliminar el comentario?
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
          setSuccess(false)
          setError('')
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
  );
};

export default CardComentario;
