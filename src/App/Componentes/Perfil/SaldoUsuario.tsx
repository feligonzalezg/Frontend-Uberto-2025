import React from 'react';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';

interface SaldoUsuarioProps {
  saldo: number;
  monto: string;
  setMonto: (monto: string) => void;
  handleAgregarSaldo: () => void;
  loading: boolean;
}

const SaldoUsuario: React.FC<SaldoUsuarioProps> = ({
  saldo,
  monto,
  setMonto,
  handleAgregarSaldo,
  loading,
}) => (
  <>
    <Typography variant="h6" sx={{ mt: 3 }}>
      Saldo Disponible: {saldo ?? ''}
    </Typography>
    <TextField
      fullWidth
      label="Monto"
      type="number"
      variant="outlined"
      margin="normal"
      value={monto}
      onChange={(e) => setMonto(e.target.value)}
    />
    <Button
      className="button-primary"
      variant="contained"
      fullWidth
      onClick={handleAgregarSaldo}
      disabled={loading || !monto}
    >
      {loading ? <CircularProgress size={24} /> : 'Agregar Saldo'}
    </Button>
  </>
);

export default SaldoUsuario;
