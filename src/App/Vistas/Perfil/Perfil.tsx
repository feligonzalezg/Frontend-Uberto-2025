import { useState } from 'react';
import { Tabs, Tab, Box, Container, Avatar, IconButton } from '@mui/material';
import DatosUsuario from '../../Componentes/Perfil/DatosUsuario';
import Viajes from '../../Componentes/Perfil/Viajes';
import Calificaciones from '../../Componentes/Perfil/Calificaciones';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import perfilService from '../../Services/Perfil';
import usuarioService from '../../Services/LoginService';
import RegistroClicks from '../../Componentes/Perfil/registrosClicks';

const Perfil = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const userObject = usuarioService.getUsuarioLogeado();
  const esChofer = usuarioService.getRolUsuario();

  const fetchImage = (image: string) => {
    setImage(image);
  };

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleImageChange = async (event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setLoading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', 'Uberto-2025');

      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/diezou2of/image/upload',
        { method: 'POST', body: cloudinaryFormData }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error(`Error Cloudinary: ${cloudinaryResponse.status}`);
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      const backendResponse = await perfilService.actualizarImagen(
        userObject,
        imageUrl
      );
      setImage(backendResponse);
    } catch (error) {
      console.error('Error completo:', error);
    }
  };

  return (
    <Container disableGutters>
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100,
          margin: '0 auto',
        }}
      >
        <Avatar
          src={image}
          alt="perfil"
          sx={{
            width: 100,
            height: 100,
            bgcolor: !image ? 'grey.400' : undefined,
          }}
        />
        <IconButton
          component="label"
          disabled={loading}
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            width: 28,
            height: 28,
          }}
        >
          <CameraAltIcon sx={{ color: 'white', fontSize: 16 }} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            disabled={loading}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          marginBottom: 2,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Datos" />
          <Tab label="Viajes" />
          <Tab label="Calificaciones" />
          {esChofer && <Tab label="Panel" />}
        </Tabs>
      </Box>
      <Box>
        {tabIndex === 0 && <DatosUsuario setImage={fetchImage} />}
        {tabIndex === 1 && <Viajes />}
        {tabIndex === 2 && <Calificaciones />}
        {tabIndex === 3 && <RegistroClicks />}
      </Box>
    </Container>
  );
};

export default Perfil;
