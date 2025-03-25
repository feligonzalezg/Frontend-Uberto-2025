import { useState } from 'react';
import { Tabs, Tab, Box, Container, Avatar, IconButton } from '@mui/material';
import DatosUsuario from '../../Componentes/Perfil/DatosUsuario';
import Viajes from '../../Componentes/Perfil/Viajes';
import Calificaciones from '../../Componentes/Perfil/Calificaciones';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import perfilService from '../../Services/Perfil';

const Perfil = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const userStorage = localStorage.getItem('usuario');
  const userObject = JSON.parse(userStorage!!);


  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleImageChange = async (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    setLoading(true);
  
    try {
      // 1. Mostrar vista previa inmediata
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
  
      // 2. Subir a Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('upload_preset', 'Uberto-2025');
  
      console.log('Iniciando subida a Cloudinary...'); // Debug
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/diezou2of/image/upload',
        { method: 'POST', body: cloudinaryFormData }
      );
  
      if (!cloudinaryResponse.ok) {
        throw new Error(`Error Cloudinary: ${cloudinaryResponse.status}`);
      }
  
      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;
      console.log('Cloudinary success, URL:', imageUrl); 
  
      // 3. Actualizar en el backend
      console.log('Iniciando actualización en backend...'); 
      console.log(userObject.id)
      const backendResponse = await perfilService.actualizarImagen(userObject, imageUrl);
      console.log('Backend response:', backendResponse); 
      // 4. Confirmar la imagen definitiva
      setImage(backendResponse);
      console.log('Backend response2:', image); 
      
  
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
        {tabIndex === 0 && <DatosUsuario />}
        {tabIndex === 1 && <Viajes />}
        {tabIndex === 2 && <Calificaciones />}
      </Box>
    </Container>
  );
};

export default Perfil;