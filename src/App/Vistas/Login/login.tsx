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
import { useSnackbar } from 'notistack'
import usuarioService from '../../Services/LoginService'

export const Login = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const iniciarSesion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formValues.userName || !formValues.password) {
      enqueueSnackbar('Usuario y contraseña son obligatorios', {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      })
      return
    }

    try {
      const usuarioObjeto = await usuarioService.validarUsuario(
        formValues.userName,
        formValues.password,
      )
      localStorage.setItem('usuario', JSON.stringify(usuarioObjeto))
      enqueueSnackbar('Inicio de sesión exitoso', {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      })
      navigate('/Home')
    } catch (error) {
      enqueueSnackbar('Error al iniciar sesión.', {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      })
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
        <InputLabel className="input-label input-label--login" htmlFor="userName">
          Usuario
        </InputLabel>
        <TextField
          className="text-field"
          fullWidth
          id="userName"
          name="userName"
          autoFocus
          required
          value={formValues.userName}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <InputLabel className="input-label input-label--login" htmlFor="password">
          Contraseña
        </InputLabel>
        <TextField
          className="text-field"
          fullWidth
          id="password"
          name="password"
          type={formValues.showPassword ? 'text' : 'password'}
          required
          value={formValues.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {formValues.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
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

