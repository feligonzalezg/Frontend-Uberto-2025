import { TextField, Button, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'

const DatosUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    saldo: "",
  })

  const actualizarCampo = (tipo: any, value: any) => {
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [tipo]: value
    }))
  } 

  
  useEffect(() => {
    const choferStorage = localStorage.getItem("usuario")
    const choferObject = JSON.parse(choferStorage!!)
    setUsuario({
      nombre: choferObject.nombreYApellido,
      apellido: "",
      telefono: choferObject.telefono,
      saldo: choferObject.saldo,
      
    })
  },[])

  return (
    <Box>
      <TextField fullWidth label="Nombre" variant="outlined" margin="normal" value={usuario.nombre} onChange={(event) => actualizarCampo("nombre", event.target.value)}/>
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        margin="normal"
        value={usuario.apellido}
        onChange={(event) => actualizarCampo("apellido", event.target.value)}
      />
      <TextField
        fullWidth
        label="Teléfono"
        variant="outlined"
        margin="normal"
        value={usuario.telefono}
        onChange={(event) => setUsuario(prevUsuario => ({
          ...prevUsuario,
          telefono: event.target.value
        }))}
        
      />

      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => console.log(usuario)}
      >
        Guardar Cambios
      </Button>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Saldo Disponible: $300.000
      </Typography>
      <TextField
        fullWidth
        label="Monto"
        type="number"
        variant="outlined"
        margin="normal"
        value={usuario.saldo}
        onChange={(event) => setUsuario(prevUsuario => ({
          ...prevUsuario,
          saldo: event.target.value
        }))}
      />

      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: 'purple' }}
        onClick={() => console.log(usuario.saldo)}
      >
        Agregar Saldo
        
      </Button>
    </Box>
  )
}

export default DatosUsuario
