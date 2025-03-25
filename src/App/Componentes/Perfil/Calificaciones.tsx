import { Alert, Box, Button, CircularProgress, Modal, Snackbar, Typography } from '@mui/material'
import CardComentario from '../Card_comentarios/Card_comentarios'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'


const Calificaciones = () => {

  const [comentarios, setComentarios] = useState<[]>([])
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!)
  
  console.log(userObject)

  useEffect(() => {

    const fetchComentarios = async ()=> {
      try {
        const response = await perfilService.getComentarios(userObject)
        setComentarios(response)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchComentarios()
  },[])

  const handleDeleteComentario = (idComentario: number) => {
    setComentarios(comentarios.filter((comentario: any) => comentario.idComentario !== idComentario));
  };

  return (
    <Box>
      {comentarios.map((comentario, index) => (
        <Box key={index}>
          <CardComentario 
            comentario={comentario}
            onDeleteComentario={handleDeleteComentario}
          />
        </Box>
      ))}
    </Box>
  )
}


export default Calificaciones
