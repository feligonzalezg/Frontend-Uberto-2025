import './CardChofer.css'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

interface CardChoferProps {
  patente: string
  nombre: string
  modelo: string
  año: number
  tarifa: number
  calificacion: number
}

const CardChofer: React.FC<CardChoferProps> = ({
  patente,
  nombre,
  modelo,
  año,
  tarifa,
  calificacion,
}) => {
  return (
    <div className="card-chofer">
      <Card className="card-chofer__card">
        <CardHeader
          className="card-chofer__header"
          title={
            <Box className="card-chofer__title">
              <Typography className="card-chofer__patente">
                {patente}
              </Typography>
              <Typography variant="body2" className="card-chofer__calificacion">
                {calificacion}
                <StarIcon />
              </Typography>
            </Box>
          }
        />
        <CardContent className="card-chofer__content">
          <Box>
            <Typography className="card-chofer__nombre">{nombre}</Typography>
            <Typography className="card-chofer__modelo">
              {modelo} • {año}
            </Typography>
            <Box className="card-chofer__info">
              <Typography className="card-chofer__tarifa">
                Valor <strong>${tarifa}</strong>
              </Typography>
            </Box>
          </Box>
          <Box>
            {' '}
            <Avatar style={{ width: '5rem', height: '5rem' }} />
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardChofer
