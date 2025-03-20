import { Box, Typography } from '@mui/material'
import CardComentario from '../Card_comentarios/Card_comentarios'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'



interface Comentario {
  nombre: string,
  fecha: string,
  estrellas: number,
  mensaje: string
}



const Calificaciones = () => {

  const [comentarios, setComentarios] = useState<Comentario[]>([])
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!!)
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

  return (
    <div>
      {comentarios.map((comentario: Comentario, index) => (
        <Box key={index}>
          <CardComentario 
          nombre={comentario.nombre}
          fecha={comentario.fecha}
          estrellas={comentario.estrellas}
          comentario={comentario.mensaje} 
          />
        </Box>
      ))}
    </div>
  )
}


export default Calificaciones
