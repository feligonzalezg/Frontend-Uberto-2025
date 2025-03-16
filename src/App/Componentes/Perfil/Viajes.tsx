import { Box, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'

const Viajes = () => {
  return (
    <Box>
      <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
        Realizados
      </Typography>
      <CardUsuario
        nombre="Roberto Pettinato"
        cantidadPersonas={2}
        foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
        desde="Av Siempre viva"
        hacia="Calle falsa"
        horario={1800}
        importe={1500}
      />
      <CardUsuario
        nombre="Roberto Pettinato"
        cantidadPersonas={2}
        foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
        desde="Av Siempre viva"
        hacia="Calle falsa"
        horario={1800}
        importe={1500}
      />
      <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
        Pendientes
      </Typography>
      <CardUsuario
        nombre="Roberto Pettinato"
        cantidadPersonas={2}
        foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
        desde="Av Siempre viva"
        hacia="Calle falsa"
        horario={1800}
        importe={1500}
      />
      <CardUsuario
        nombre="Roberto Pettinato"
        cantidadPersonas={2}
        foto="https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/08/PETTINATO-APERTURA.jpg?w=1280&ssl=1"
        desde="Av Siempre viva"
        hacia="Calle falsa"
        horario={1800}
        importe={1500}
      />{' '}
    </Box>
  )
}

export default Viajes
