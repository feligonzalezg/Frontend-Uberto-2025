import { TextField, Button, Typography, Box, CircularProgress, Snackbar, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'
import Amigos from './amigos'

interface Usuario {
  nombre: string
  apellido: string
  telefono?: number
  saldo?: number
  amigos?: []
  precioBase?: number
  dominio?: string
  descripcion?: string
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [success, setSuccess] = useState(false)
  const [monto, setMonto] = useState("")

  const actualizarCampo = (tipo: keyof Usuario, value: string | number) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [tipo]: value,
    }))
  }

  const handleGuardarCambios = async () => {
    setLoading(true)
    console.log('usuario Modificado ', usuario)

    try {
      await perfilService.actualizarUsuario(userObject.id, usuario)
      setMensaje("Cambios guardados exitosamente.")
      setSuccess(true)
    } catch (error) {
      setError("Error al guardar los cambios. Por favor, inténtalo de nuevo.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAgregarSaldo = async () => {
    setLoading(true)
    console.log('usuario Modificado ', monto)

    try {
      await perfilService.cargarSaldo(userObject.id, monto)
      setMensaje("Se cargó saldo exitosamente.")
      setSuccess(true)
      setMonto("")
    } catch (error) {
      setError("Error al cargar saldo. Por favor, inténtalo de nuevo.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchDatosUsuario = async () => {
      try {
        const response = await perfilService.dataUsuario(userObject)
        setUsuario(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDatosUsuario()
  }, [])

  return (
    <Box>
      <TextField
        fullWidth
        label="Nombre"
        variant="outlined"
        margin="normal"
        value={usuario.nombre}
        onChange={(event) => actualizarCampo("nombre", event.target.value)}
      />
      <TextField
        fullWidth
        label="Apellido"
        variant="outlined"
        margin="normal"
        value={usuario.apellido}
        onChange={(event) => actualizarCampo("apellido", event.target.value)}
      />

      {!esChofer && (
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          value={usuario.telefono ?? ""}
          onChange={(event) => actualizarCampo("telefono", Number(event.target.value))}
        />
      )}

      {esChofer && (
        <>
          <TextField
            fullWidth
            label="Precio base"
            variant="outlined"
            margin="normal"
            value={usuario.precioBase ?? ""}
            onChange={(event) => actualizarCampo("precioBase", Number(event.target.value))}
          />

<Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
        Automivilista Premium
      </Typography>
          <TextField
            fullWidth
            label="Dominio"
            variant="outlined"
            margin="normal"
            value={usuario.dominio ?? ""}
            onChange={(event) => actualizarCampo("dominio", event.target.value)} // Dominio es texto
          />
          <TextField
            fullWidth
            label="Modelo"
            variant="outlined"
            margin="normal"
            value={usuario.modelo ?? ""}
            onChange={(event) => actualizarCampo("modelo", event.target.value)} // Modelo es texto
          />
        </>
      )}

      <Button
        className="button-primary"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleGuardarCambios}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Guardar Cambios"}
      </Button>

      {!esChofer && (
  <>
    <Typography variant="h6" sx={{ mt: 3 }}>
      Saldo Disponible: {usuario.saldo ?? ""}
    </Typography>
    <TextField
      fullWidth
      label="Monto"
      type="number"
      variant="outlined"
      margin="normal"
      value={monto}
      onChange={(event) => setMonto(event.target.value)}
    />

    <Button
      className="button-primary"
      variant="contained"
      fullWidth
      sx={{ mt: 2, backgroundColor: 'purple' }}
      onClick={handleAgregarSaldo}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : "Agregar Saldo"}
    </Button>

    {usuario.amigos && <Amigos amigos={usuario.amigos} />}
  </>
)}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DatosUsuario