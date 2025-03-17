import { Box, Typography } from '@mui/material'
import CardComentario from '../Card_comentarios/Card_comentarios'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'



interface Comentario {
  autor: string,
  fecha: string,
  puntaje: number,
  mensaje: string
}



const Calificaciones = () => {

  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!!)


  useEffect(() => {

    const fetchComentarios = async ()=> {
      try {
        const response = await perfilService.getComentarios(userObject.id)
        setComentarios(response)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchComentarios()
  },[])

  return (
    <div>
      {comentarios.map((comentario: Comentario, index) => (
        <Box key={index}>
          <CardComentario 
          nombre={comentario.autor}
          fecha={comentario.fecha}
          puntuacion={comentario.puntaje}
          comentario={comentario.mensaje} 
          />
        </Box>
      ))}
    </div>
  )
}


export default Calificaciones
