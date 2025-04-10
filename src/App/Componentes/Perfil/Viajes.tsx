import { Box, Divider, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'

interface Viaje {
  id: number;
  nombre: string;
  cantidadDePasajeros: number;
  origen: string;
  destino: string;
  fechaInicio: string;
  importe: number;
  puedeCalificar: boolean;
  fechaFin: string;
  foto: string;
}

const Viajes = () => {
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!)
  const esChofer = userObject.esChofer
  const [viajesRealizados, setViajesRealizados] = useState<Viaje[]>([])
  const [viajesPendientes, setViajesPendientes] = useState<Viaje[]>([])
  const [totalFacturacion, setTotalFacturacion] = useState<number>(0); 


  useEffect(() => {
    const fetchViajes = async () => {
      try {
        const responseRealizados = await perfilService.getViajesRealizados(userObject)
        setViajesRealizados(responseRealizados.viajesRealizados);
        setTotalFacturacion(responseRealizados.totalFacturado)
        console.log(responseRealizados);
    
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
              idViaje={viaje.id}
              nombre={viaje.nombre}
              cantidadPersonas={viaje.cantidadDePasajeros}
              desde={viaje.origen}
              hacia={viaje.destino}
              horario={viaje.fechaInicio}
              importe={viaje.importe}
              puedeCalificar ={viaje.puedeCalificar}
              fechaFin={viaje.fechaFin}
              foto={viaje.foto}
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
          idViaje={viaje.id}
          nombre={viaje.nombre}
          cantidadPersonas={viaje.cantidadDePasajeros}
          desde={viaje.origen}
          hacia={viaje.destino}
          horario={viaje.fechaInicio}
          importe={viaje.importe}
          puedeCalificar ={viaje.puedeCalificar}
          fechaFin={viaje.fechaFin}
          foto={viaje.foto}
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