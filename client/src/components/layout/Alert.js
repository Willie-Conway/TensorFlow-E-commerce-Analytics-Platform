// client/src/components/layout/Alert.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Alert as MuiAlert, Stack } from '@mui/material';

const Alert = () => {
  // Assuming your alerts are in redux state as an array: state.alert
  const alerts = useSelector(state => state.alert);

  if (!alerts || alerts.length === 0) return null;

  return (
    <Stack spacing={2} sx={{ width: '100%', marginBottom: 2 }}>
      {alerts.map(alert => (
        <MuiAlert
          key={alert.id}
          severity={alert.alertType || 'info'}
          variant="filled"
          elevation={6}
          sx={{ fontWeight: 'bold' }}
        >
          {alert.msg}
        </MuiAlert>
      ))}
    </Stack>
  );
};

export default Alert;
