import './Login.css'
import {
  Box,
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material'
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usuarioService from '../../Services/LoginService'

export const Login = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    showPassword: false,
  })
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const iniciarSesion = async () => {
    event?.preventDefault()

    try {
      if (!usuario || !password) {
        console.error('Usuario invalido')
        setError(true)

        return
      }
      const usuarioObjeto = await usuarioService.validarUsuario(
        usuario,
        password,
      )
      console.log('Inicio de sesión exitoso. Usuario:', usuarioObjeto)
      const usuarioId = usuarioObjeto.id // Obtener el ID de usuario del objeto de usuario
      localStorage.setItem('usuario', JSON.stringify(usuarioObjeto))
      console.log('Inicio de sesión exitoso. ID de usuario:', usuarioId)
      navigate('/Home')

      //setUser(usuarioObjeto) // Puedes almacenar el objeto completo del usuario si lo necesitas
    } catch (error) {
      console.error('Error al iniciar sesión:')
    }
  }

  const togglePasswordVisibility = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }))
  }

  return (
    <div className="layout-content layout-content--login gradient">
      <Box className="logo">
        <h1>Uberto</h1>
      </Box>
      <Box className="login-form" component="form" onSubmit={iniciarSesion}>
        <InputLabel
          className="input-label input-label--login"
          htmlFor="userName"
        >
          Usuario
        </InputLabel>

        <TextField
          className="text-field"
          fullWidth
          id="userName"
          name="userName"
          autoFocus
          required
          onChange={(event) => setUsuario(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
        />

        <InputLabel
          className="input-label input-label--login"
          htmlFor="password"
        >
          Contraseña
        </InputLabel>

        <TextField
          className="text-field"
          fullWidth
          id="password"
          name="password"
          type={formValues.showPassword ? 'text' : 'password'}
          required
          onChange={(event) => setPassword(event.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {formValues.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button className="button-gradient" type="submit" variant="contained">
          Ingresar
        </Button>
      </Box>
    </div>
  )
}

export default Login
