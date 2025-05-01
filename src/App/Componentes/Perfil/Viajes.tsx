import { Box, Divider, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'
import usuarioService from '../../Services/LoginService';

const Viajes = () => {
  const userObject = usuarioService.getUsuarioLogeado()
  const esChofer = usuarioService.getRolUsuario()
  
  const [viajesRealizados, setViajesRealizados] = useState<[]>([])
  const [viajesPendientes, setViajesPendientes] = useState<[]>([])
  const [totalFacturacion, setTotalFacturacion] = useState<number>(0); 


  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const responseRealizados = await perfilService.getViajesRealizados(userObject)
        setViajesRealizados(responseRealizados.viajesRealizados);
        setTotalFacturacion(responseRealizados.totalFacturado)
    
        if (!esChofer) {
          const responsePendientes = await perfilService.getViajesPendientes(userObject)
          setViajesPendientes(responsePendientes);
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchViajes()
  }, [])

  return (
    <Box sx={{ paddingBottom: '50px'}}>
  
      {!esChofer && (
        <>
          <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
            Pendientes
          </Typography>
          {viajesPendientes.map((viaje, index) => (
            <CardUsuario
              key={index}
              viaje={viaje}
            />
          ))}
        </>
      )}
      
      <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
        Realizados
      </Typography>
      {viajesRealizados.map((viaje, index) => (
        <CardUsuario
          key={index}
          viaje={viaje}
        />
        
      ))}
      

      {esChofer && (
        <>
        <Box sx={{
          position: 'fixed',
          bottom: 83,
          left: 0,
          width: '100%',
          backgroundColor: '#fcfaff',
          padding: '10px 15px',
          borderTop: '1px solid #ddd',
        }}>
          <Divider sx={{ marginBottom: 1, borderColor: 'black', height: '2px' }} />
          <Typography fontWeight="bold" variant="h7">
            Total Facturación: ${totalFacturacion?.toFixed(2)}
          </Typography>
        </Box>
        </>
      )}  
    </Box>
  )
}

export default Viajes