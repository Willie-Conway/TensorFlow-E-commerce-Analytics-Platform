// client/src/components/auth/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from '@mui/material';

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState(null);

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    dispatch(register({ name, email, password }));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 3,
      }}
    >
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit} noValidate>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            autoComplete="name"
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            autoComplete="email"
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
          />

          <TextField
            label="Confirm Password"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Log in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
