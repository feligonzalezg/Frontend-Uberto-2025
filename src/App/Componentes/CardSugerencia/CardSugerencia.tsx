// CardSugerencia.tsx
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

const CardSugerencia = ({ origen, destino, cantidad }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'white',
        p: 1,
        mb: 1,
        width: '100%',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {origen} → {destino}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon fontSize="small" sx={{ color: 'gray' }} />

        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <GroupIcon fontSize="small" sx={{ color: 'gray' }} />
          <Typography variant="body2" color="text.secondary">
            {cantidad} pasajero(s)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSugerencia;
