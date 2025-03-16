import { Box, Typography } from '@mui/material'
import CardComentario from '../Card_comentarios/Card_comentarios'
import { useEffect, useState } from 'react'



interface Comentario {
  autor: {
    nombreYApellido: string
  },
  fecha: string,
  puntaje: number,
  mensaje: string
}


const Calificaciones = () => {

  const [comentarios, setComentarios] = useState([])

  useEffect(() => {
    const choferStorage = localStorage.getItem("usuario")
    const choferObject = JSON.parse(choferStorage!!)
    setComentarios(choferObject.comentarios)
  },[])

  return (
    <div>
      {comentarios.map((comentario: Comentario) => (
        <Box>
          <CardComentario 
          nombre={comentario.autor.nombreYApellido} 
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
