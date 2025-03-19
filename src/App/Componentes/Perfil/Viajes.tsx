import { Box, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'

interface Viaje {
  conductor: string;
  cantidadDePasajeros: number;
  origen: string;
  destino: string;
  fechaInicio: number;
  importe: number;
  pendiente: boolean;
}

const Viajes = () => {
  const userStorage = localStorage.getItem("usuario")
  const userObject = JSON.parse(userStorage!!)
  const esChofer = userObject.esChofer
  const [viajesRealizados, setViajesRealizados] = useState<Viaje[]>([])
  const [viajesPendientes, setViajesPendientes] = useState<Viaje[]>([])

  useEffect(() => {
    const fetchViajes = async () => {
      try {
       
        const responseRealizados = await perfilService.getViajesRealizados(userObject)
        const viajesRealizadosConPendiente = responseRealizados.map((viaje) => ({
          ...viaje,
          pendiente: false,
        }));
        setViajesRealizados(viajesRealizadosConPendiente);
        console.log(viajesRealizadosConPendiente);

    
        if (!esChofer) {
          const responsePendientes = await perfilService.getViajesPendientes(userObject)
          const viajesPendientesConPendiente = responsePendientes.map((viaje) => ({
            ...viaje,
            pendiente: true,
          }));
          setViajesPendientes(viajesPendientesConPendiente);
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchViajes()
  }, [])

  return (
    <Box>
  
      {!esChofer && (
        <>
          <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
            Pendientes
          </Typography>
          {viajesPendientes.map((viaje, index) => (
            <CardUsuario
              key={index}
              nombre={viaje.conductor}
              cantidadPersonas={viaje.cantidadDePasajeros}
              desde={viaje.origen}
              hacia={viaje.destino}
              horario={viaje.fechaInicio}
              importe={viaje.importe}
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
          nombre={viaje.conductor}
          cantidadPersonas={viaje.cantidadDePasajeros}
          desde={viaje.origen}
          hacia={viaje.destino}
          horario={viaje.fechaInicio}
          importe={viaje.importe}
          pendiente ={viaje.pendiente}
        />
        
      ))}
    </Box>
  )
}

export default Viajes