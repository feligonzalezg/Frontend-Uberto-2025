import './App.css'
import { ReadAppRouter } from './routes'
import { SnackbarProvider } from 'notistack' 

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <ReadAppRouter />
    </SnackbarProvider>
  )
}

export default App

