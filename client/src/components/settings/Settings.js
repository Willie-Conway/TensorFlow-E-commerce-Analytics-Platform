// client/src/components/settings/Settings.js
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Box,
} from '@mui/material';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [username, setUsername] = useState('User123');
  const [email, setEmail] = useState('user@example.com');

  const handleDarkModeToggle = () => setDarkMode(!darkMode);
  const handleNotificationsToggle = () => setNotificationsEnabled(!notificationsEnabled);

  const handleSave = () => {
    // TODO: Add save logic (e.g., API call or redux action)
    alert('Settings saved!');
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleDarkModeToggle} />}
          label="Enable Dark Mode"
        />
        <FormControlLabel
          control={<Switch checked={notificationsEnabled} onChange={handleNotificationsToggle} />}
          label="Enable Notifications"
        />

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Settings;

