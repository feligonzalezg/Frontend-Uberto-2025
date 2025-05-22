import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import ClickIcon from '@mui/icons-material/TouchApp'; // ícono de click
import logService from '../../Services/LogService';
import usuarioService from '../../Services/LoginService';

const RegistroClicks = ({}) => {
  const [totalClicks, setTotalClicks] = useState();
  const [loading, setLoading] = useState(true);
  const token = usuarioService.getUsuarioLogeado();

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const response = await logService.totalClicksConductor(token);
        setTotalClicks(response?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchClicks();
  }, [token]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        sx={{
          padding: 5,
          whiteSpaceCollapseidth: '100%',
          textAlign: 'center',
          boxShadow: 4,
          borderRadius: '0.5rem',
        }}
      >
        <CardContent>
          <ClickIcon color="primary" sx={{ fontSize: 50 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Total de Clicks
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h3" color="secondary">
              {totalClicks}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistroClicks;
