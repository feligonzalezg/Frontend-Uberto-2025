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

export const Login = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    userName: '',
    password: '',
    showPassword: false,
  })

  const togglePasswordVisibility = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }))
  }

  const handleSubmit = () => {
    navigate('/Home')
  }

  return (
    <div className="layout-content layout-content--login gradient">
      <Box className="logo">
        <h1>Uberto</h1>
      </Box>
      <Box className="login-form" component="form" onSubmit={handleSubmit}>
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
          onChange={() => {}}
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
          onChange={() => {}}
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
