import {
  Box,
  Typography,
  Avatar,
  IconButton,  
} from '@mui/material'
import AddIcon from '@mui/icons-material/PersonAdd'


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

const Sugerencias = ({ sugeridos, handleAgregarAmigo  }: SugerenciasProps) => {



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
          <IconButton onClick={() => handleAgregarAmigo(sugerido)}>
            <AddIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />
          </IconButton>
        </Box>
      ))}


    </Box>
  )
}

export default Sugerencias
