import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/raleway';
import '@fontsource/poppins/400.css';

const colors = {
  primary: '#2D3250',
  secondary: '#424769',
  fondo: '#f0eff2',
  comentario: '#0000',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.fondo,
    },
    text: {
      comentario: 'white', 
    },
  },
 
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: colors.fondo,
        },
        body: {
          backgroundColor: colors.fondo,
        },
      },
    },
  },
});

export default theme;
