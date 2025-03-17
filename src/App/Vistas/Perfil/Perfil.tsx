import { useState } from 'react'
import { Tabs, Tab, Box, Container, Avatar } from '@mui/material'
import DatosUsuario from '../../Componentes/Perfil/DatosUsuario'
import Viajes from '../../Componentes/Perfil/Viajes'
import Calificaciones from '../../Componentes/Perfil/Calificaciones'
import Amigos from '../../Componentes/Perfil/amigos'

const Perfil = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex)
  }

  return (
    <Container>
      {/* Imagen de perfil */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: 2,
          margin: '0.5rem',
        }}
      >
        <Avatar
          src="https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
          alt="perfil"
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ marginBottom: 2 }}
      >
        <Tab label="Datos" />
        <Tab label="Viajes" />
        <Tab label="Calificaciones" />
      </Tabs>

      {/* Contenido */}
      <Box>
        {tabIndex === 0 && <DatosUsuario />}
        {tabIndex === 1 && <Viajes />}
        {tabIndex === 2 && <Calificaciones />}
      </Box>
    </Container>
  )
}

export default Perfil
