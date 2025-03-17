import { TextField, Button, Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'
import Amigos from './amigos'

interface Usuario {
  nombre: string,
  apellido: string,
  telefono?: number,
  saldo?: number,
  amigos?: [],
  precioBase?: number,
  dominio?: string,
  descripcion?: string,
  modelo?: string
}

const DatosUsuario = () => {
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    apellido: "",
  })

  const actualizarCampo = (tipo: any, value: any) => {
    setUsuario(prevUsuario => ({
      ...prevUsuario,
      [tipo]: value
    }))
  } 

  
  useEffect(() => {

    const fetchDatosUsuario = async ()=> {
      try {
        const response = await perfilService.dataUsuario(userObject)
        setUsuario(response)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchDatosUsuario()
  },[])

  return (
    <Box>
      <TextField fullWidth label="Nombre" variant="outlined" margin="normal" value={usuario!!.nombre} onChange={(event) => actualizarCampo("nombre", event.target.value)}/>
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        margin="normal"
        value={usuario!!.apellido}
        onChange={(event) => actualizarCampo("apellido", event.target.value)}
      />
      {!esChofer &&
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          value={usuario.telefono ?? ""}
          onChange={(event) => actualizarCampo("telefono", Number(event.target.value))}
          
        />
      }
      {esChofer &&
        <TextField
        fullWidth
        label="Precio base"
        variant="outlined"
        margin="normal"
        value={usuario.precioBase ?? ""}
        onChange={(event) => actualizarCampo("precioBase", Number(event.target.value))}
        
      />
      }

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
        value={usuario.saldo ?? ""}
        onChange={(event) => actualizarCampo("saldo", event.target.value)}
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
      {usuario.amigos && <Amigos amigos={usuario.amigos} /> }
    </Box>
  )
}

export default DatosUsuario
