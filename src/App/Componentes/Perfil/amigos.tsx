import { Box, Typography, Avatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Amigo {
  nombreYApellido: string,
  username: string,
  avatar: string,
}


const Amigos = ({amigos}: any) => {

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Amigos
      </Typography>

      {amigos.map((amigo: Amigo, index: any) => (
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
