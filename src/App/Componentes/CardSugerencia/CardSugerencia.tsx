import { Card, CardContent, Typography, Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowRightAlt';
interface CardSugerenciaProps {
  origen: string;
  destino: string;
  cantidad: number;
  onClick: () => void;
}

const CardSugerencia = ({ origen, destino, cantidad, onClick }: CardSugerenciaProps) => {
  return (
    <Card
         onClick={onClick}

      sx={{
        borderRadius: 3,
        boxShadow: 2,
        bgcolor: '#eaf4fd',
        p: 2,
        mb: 2,
        width: '100%',
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <HistoryIcon fontSize="small" sx={{ color: '#1976d2' }} />
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            Última búsqueda
          </Typography>
        </Box>

       <Box display="flex" alignItems="center" gap={1} mb={1} flexWrap="wrap">
          <Typography variant="subtitle1" fontWeight="bold">
            {origen}
          </Typography>
          <ArrowForwardIosIcon fontSize="small" sx={{ color: '#1976d2' }} />
          <Typography variant="subtitle1" fontWeight="bold">
            {destino}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <GroupIcon fontSize="small" sx={{ color: 'gray' }} />
          <Typography variant="body2" color="text.secondary">
            {cantidad} pasajero{cantidad !== 1 && 's'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSugerencia;
