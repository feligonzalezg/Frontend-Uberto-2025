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
        borderRadius: 4,
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        bgcolor: '#f5faff',
        p: 2,
        mb: 2,
        width: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <HistoryIcon fontSize="small" sx={{ color: '#673ab7' }} />
          <Typography variant="subtitle2" sx={{ color: '#673ab7', fontWeight: 'bold' }}>
            Última búsqueda
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1} flexWrap="wrap">
          <Typography variant="subtitle1" fontWeight="bold">
            {origen}
          </Typography>
          <ArrowForwardIosIcon fontSize="small" sx={{ color: '#673ab7' }} />
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
