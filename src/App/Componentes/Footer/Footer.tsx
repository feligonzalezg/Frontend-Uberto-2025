import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import HomeIcon from '@mui/icons-material/Home'
import PortraitIcon from '@mui/icons-material/Portrait'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'


const Footer = () => {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const logout = () => {
    localStorage.clear()
    }

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: 390 }}
          value={value}
          onChange={handleChange}
          className="header"
        >
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Home"
            value="home"
            icon={<HomeIcon />}
            component={Link}
            to="/Home"
          />
          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Perfil"
            value="perfil"
            icon={<PortraitIcon />}
            component={Link}
            to="/Perfil_Usuario"
          />

          <BottomNavigationAction
            sx={{ color: 'white', '&.Mui-selected': { color: '#e6ccb2' } }}
            label="Exit"
            value="exitApp"
            icon={<ExitToAppIcon />}
            component={Link}
            to="/Login"
            onClick={logout}
          />
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default Footer
