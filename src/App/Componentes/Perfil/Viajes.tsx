import { Box, Typography } from '@mui/material'
import CardUsuario from '../Card_usuario/Card_usuario'
import { useEffect, useState } from 'react'
import perfilService from '../../Services/Perfil'

interface Viaje {
  conductor: string;
  cantidadPersonas: number;
  origen: string;
  destino: string;
  fechaInicio: number;
  importe: number;
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
        // Obtener viajes realizados
        const responseRealizados = await perfilService.getViajesRealizados(userObject)
        setViajesRealizados(responseRealizados)

        // Obtener viajes pendientes solo si no es chofer
        if (!esChofer) {
          const responsePendientes = await perfilService.getViajesPendientes(userObject)
          setViajesPendientes(responsePendientes)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchViajes()
  }, [esChofer, userObject])

  return (
    <Box>
      {/* Viajes Realizados */}
      <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
        Realizados
      </Typography>
      {viajesRealizados.map((viaje, index) => (
        <CardUsuario
          key={index}
          nombre={viaje.conductor}
          cantidadPersonas={viaje.cantidadPersonas}
          desde={viaje.origen}
          hacia={viaje.destino}
          horario={viaje.fechaInicio}
          importe={viaje.importe}
        />
      ))}

      {/* Viajes Pendientes (solo para no choferes) */}
      {!esChofer && (
        <>
          <Typography fontWeight="bold" variant="h5" sx={{ margin: 3 }}>
            Pendientes
          </Typography>
          {viajesPendientes.map((viaje, index) => (
            <CardUsuario
              key={index}
              nombre={viaje.conductor}
              cantidadPersonas={viaje.cantidadPersonas}
              desde={viaje.origen}
              hacia={viaje.destino}
              horario={viaje.fechaInicio}
              importe={viaje.importe}
            />
          ))}
        </>
      )}
    </Box>
  )
}

export default Viajes