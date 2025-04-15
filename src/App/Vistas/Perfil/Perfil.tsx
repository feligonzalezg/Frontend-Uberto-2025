import { useState } from 'react';
import { Tabs, Tab, Box, Container, Avatar, IconButton } from '@mui/material';
import DatosUsuario from '../../Componentes/Perfil/DatosUsuario';
import Viajes from '../../Componentes/Perfil/Viajes';
import Calificaciones from '../../Componentes/Perfil/Calificaciones';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import perfilService from '../../Services/Perfil';
import usuarioService from '../../Services/LoginService';


const Perfil = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const userObject = usuarioService.getUsuarioLogeado()
  
  const fetchImage = (image: string) => {
    setImage(image)
  }
  
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
      
      const backendResponse = await perfilService.actualizarImagen(userObject, imageUrl);
      setImage(backendResponse);
      
    } catch (error) {
      console.error('Error completo:', error);
    } 
  };
  
  
  return (
    <Container>
      <Box sx={{ position: 'relative', width: 100, height: 100, ml: '8.5em' }}>
        <Avatar 
          src={image} 
          alt="perfil" 
          sx={{ 
            width: 100, 
            height: 100,
            bgcolor: !image ? 'grey.400' : undefined 
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
          }}
        >
          <CameraAltIcon sx={{ color: 'white', fontSize: 20 }} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            disabled={loading}
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
        {tabIndex === 0 && <DatosUsuario setImage={fetchImage}/>}
        {tabIndex === 1 && <Viajes />}
        {tabIndex === 2 && <Calificaciones />}
      </Box>
    </Container>
  );
};

export default Perfil;