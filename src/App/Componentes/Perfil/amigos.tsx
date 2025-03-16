import { Box, Typography, Avatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState } from 'react'

interface Amigo {
  nombreYApellido: string,
  avatar: string,
  info: string
}


const Amigos = () => {

  const [usuario, setUsuario] = useState({
    amigos:[]
  })


  useEffect(() => {
    const choferStorage = localStorage.getItem("usuario")
    const choferObject = JSON.parse(choferStorage!!)
    setUsuario({
      amigos: choferObject.amigos || [],
    })
  },[])

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Amigos
      </Typography>

      {usuario.amigos.map((amigo: Amigo) => (
        <Box
          //key={amigo.nombreYApellido}
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
              <Typography variant="body1">{amigo.info}</Typography>
            </Box>
          </Box>
          <IconButton>
            <DeleteIcon
              fontSize="large"
              sx={{ color: 'var(--primary-color)' }}
            />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

export default Amigos
