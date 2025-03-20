import { useState } from 'react'
import { Tabs, Tab, Box, Container, Avatar, IconButton } from '@mui/material'
import DatosUsuario from '../../Componentes/Perfil/DatosUsuario'
import Viajes from '../../Componentes/Perfil/Viajes'
import Calificaciones from '../../Componentes/Perfil/Calificaciones'
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const Perfil = () => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex)
  }

  const [image, setImage] = useState(
    "https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/98361598_3114874475297340_7504201618741526528_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nvrVapNSPAsQ7kNvgHZcNt_&_nc_oc=Adi3tFTGUd6UwwyFEwgBEeolCi0jeYwDrSW5HIyzI5H_p_KX0ngL4faPIxO9OHP1PmA&_nc_zt=23&_nc_ht=scontent.faep8-2.fna&_nc_gid=A-iIqpoy2P5O1pD4e-4-6CF&oh=00_AYH4cftIAEOLWBOHadTo1HHfrvtyijCvW9D_SP5GnOnQkQ&oe=67F87D17"
  );

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Container>
         <Box sx={{ position: 'relative', width: 100, height: 100 , ml:'8.5em'}}>
     
      <Avatar
        src={image}
        alt="perfil"
        sx={{ width: 100, height: 100 }}
      />
      <IconButton
        component="label"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <CameraAltIcon sx={{ color: 'white', fontSize: 20 }} />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </IconButton>
    </Box>

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

  
      <Box>
        {tabIndex === 0 && <DatosUsuario />}
        {tabIndex === 1 && <Viajes />}
        {tabIndex === 2 && <Calificaciones />}
      </Box>
    </Container>
  )
}

export default Perfil