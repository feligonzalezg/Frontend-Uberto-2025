import { Box, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'

interface Viaje {
  id: number;
  conductor: string;
  cantidadDePasajeros: number;
  origen: string;
  destino: string;
  fechaInicio: number;
  importe: number;
  puedeCalificar: boolean;
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
        setViajesRealizados(responseRealizados);
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
    <Box>
  
      {!esChofer && (
        <>
          <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
            Pendientes
          </Typography>
          {viajesPendientes.map((viaje, index) => (
            <CardUsuario
              key={index}
              idViaje={viaje.id}
              nombre={viaje.conductor}
              cantidadPersonas={viaje.cantidadDePasajeros}
              desde={viaje.origen}
              hacia={viaje.destino}
              horario={viaje.fechaInicio}
              importe={viaje.importe}
              puedeCalificar ={viaje.puedeCalificar}
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
          nombre={viaje.conductor}
          cantidadPersonas={viaje.cantidadDePasajeros}
          desde={viaje.origen}
          hacia={viaje.destino}
          horario={viaje.fechaInicio}
          importe={viaje.importe}
          puedeCalificar ={viaje.puedeCalificar}
        />
        
      ))}
    </Box>
  )
}

export default Viajes